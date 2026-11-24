// Online Food Ordering System - Frontend Application
document.addEventListener('DOMContentLoaded', () => {
  // State
  let restaurants = [];
  let menuItems = [];
  let currentFilter = 'ALL';
  let currentView = 'cards'; // 'cards' | 'table'
  let editingItemId = null;

  // DOM Elements
  const alertContainer = document.getElementById('alertContainer');
  const apiKeyInput = document.getElementById('apiKeyInput');
  const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');

  // Form elements
  const menuItemForm = document.getElementById('menuItemForm');
  const editItemIdInput = document.getElementById('editItemId');
  const restaurantSelect = document.getElementById('restaurantSelect');
  const itemNameInput = document.getElementById('itemName');
  const itemPriceInput = document.getElementById('itemPrice');
  const itemCategoryInput = document.getElementById('itemCategory');
  const itemDescriptionInput = document.getElementById('itemDescription');
  const submitBtn = document.getElementById('submitBtn');
  const cancelEditBtn = document.getElementById('cancelEditBtn');
  const formHeaderTitle = document.getElementById('formHeaderTitle');

  // Restaurant Modal & Form
  const restaurantForm = document.getElementById('restaurantForm');
  const restaurantNameInput = document.getElementById('restaurantName');
  const restaurantCuisineInput = document.getElementById('restaurantCuisine');
  const restaurantAddressInput = document.getElementById('restaurantAddress');
  const newRestaurantModalEl = document.getElementById('newRestaurantModal');
  const newRestaurantModal = newRestaurantModalEl ? new bootstrap.Modal(newRestaurantModalEl) : null;

  // Views & Filters
  const restaurantFilter = document.getElementById('restaurantFilter');
  const cardsView = document.getElementById('cardsView');
  const tableView = document.getElementById('tableView');
  const menuItemsTableBody = document.getElementById('menuItemsTableBody');
  const emptyState = document.getElementById('emptyState');
  const itemCountBadge = document.getElementById('itemCountBadge');
  const viewCardsBtn = document.getElementById('viewCardsBtn');
  const viewTableBtn = document.getElementById('viewTableBtn');

  // Endpoints
  const RESTAURANTS_API = '/restaurants';
  const MENU_ITEMS_API = '/menu-items';

  // Get current API key
  const getApiKey = () => {
    return (apiKeyInput.value || localStorage.getItem('food_ordering_api_key') || 'my-secret-food-key').trim();
  };

  // Save API key
  if (saveApiKeyBtn) {
    saveApiKeyBtn.addEventListener('click', () => {
      const key = apiKeyInput.value.trim();
      localStorage.setItem('food_ordering_api_key', key);
      showAlert('API Key saved successfully!', 'success');
      fetchMenuItems();
    });
  }

  // Restore saved API key on init
  const savedKey = localStorage.getItem('food_ordering_api_key');
  if (savedKey) {
    apiKeyInput.value = savedKey;
  }

  // Show Bootstrap Alert
  const showAlert = (message, type = 'success') => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show shadow-sm" role="alert">
        <div>${message}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    alertContainer.replaceChildren(wrapper);
    setTimeout(() => {
      const alert = wrapper.querySelector('.alert');
      if (alert) {
        const bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
        bsAlert.close();
      }
    }, 4500);
  };

  // HTML sanitization helper
  const escapeHtml = (str) => {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // Populate Restaurant Select dropdowns (Form & Filter)
  const renderRestaurantOptions = () => {
    // Select in form
    const currentFormSelection = restaurantSelect.value;
    const formOptions = ['<option value="">Select a restaurant...</option>'].concat(
      restaurants.map(
        (r) => `<option value="${r.id}">${escapeHtml(r.name)} (${escapeHtml(r.cuisine || 'General')})</option>`,
      ),
    );
    restaurantSelect.innerHTML = formOptions.join('');
    if (currentFormSelection) {
      restaurantSelect.value = currentFormSelection;
    }

    // Select in filter
    const currentFilterSelection = restaurantFilter.value || 'ALL';
    const filterOptions = ['<option value="ALL">All Restaurants</option>'].concat(
      restaurants.map(
        (r) => `<option value="${r.id}">${escapeHtml(r.name)}</option>`,
      ),
    );
    restaurantFilter.innerHTML = filterOptions.join('');
    if (restaurants.some((r) => String(r.id) === currentFilterSelection) || currentFilterSelection === 'ALL') {
      restaurantFilter.value = currentFilterSelection;
      currentFilter = currentFilterSelection;
    } else {
      restaurantFilter.value = 'ALL';
      currentFilter = 'ALL';
    }
  };

  // Render Menu Items based on filter & view mode
  const render = () => {
    const filteredItems = menuItems.filter((item) => {
      if (currentFilter === 'ALL') return true;
      return String(item.restaurantId) === String(currentFilter);
    });

    itemCountBadge.textContent = `${filteredItems.length} ${filteredItems.length === 1 ? 'item' : 'items'}`;

    if (filteredItems.length === 0) {
      cardsView.innerHTML = '';
      menuItemsTableBody.innerHTML = '';
      cardsView.classList.add('d-none');
      tableView.classList.add('d-none');
      emptyState.classList.remove('d-none');
      return;
    }

    emptyState.classList.add('d-none');

    if (currentView === 'cards') {
      cardsView.classList.remove('d-none');
      tableView.classList.add('d-none');

      const cardsHtml = filteredItems
        .map((item) => {
          const restaurantName = item.restaurant?.name || 'Restaurant #' + item.restaurantId;
          const formattedPrice = Number(item.price).toFixed(2);
          return `
            <div class="col-md-6" id="item-card-${item.id}">
              <div class="card h-100 shadow-sm border-0 menu-card">
                <div class="card-body d-flex flex-column">
                  <div class="d-flex justify-content-between align-items-start mb-2">
                    <span class="badge bg-danger-subtle text-danger border border-danger-subtle badge-category">
                      ${escapeHtml(item.category || 'General')}
                    </span>
                    <span class="price-tag">$${formattedPrice}</span>
                  </div>
                  <h5 class="card-title text-dark fw-bold mb-1">${escapeHtml(item.name)}</h5>
                  <div class="text-muted small mb-2">
                    <i class="bi bi-shop me-1 text-danger"></i>${escapeHtml(restaurantName)}
                  </div>
                  <p class="card-text text-secondary small flex-grow-1">
                    ${escapeHtml(item.description || 'No description provided.')}
                  </p>
                  <div class="mt-auto pt-3 border-top d-flex justify-content-end gap-2">
                    <button class="btn btn-outline-primary btn-sm edit-btn" data-id="${item.id}" title="Edit Item">
                      <i class="bi bi-pencil me-1"></i> Edit
                    </button>
                    <button class="btn btn-outline-danger btn-sm delete-btn" data-id="${item.id}" title="Delete Item">
                      <i class="bi bi-trash3 me-1"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
        })
        .join('');

      cardsView.innerHTML = cardsHtml;
    } else {
      cardsView.classList.add('d-none');
      tableView.classList.remove('d-none');

      const rowsHtml = filteredItems
        .map((item) => {
          const restaurantName = item.restaurant?.name || 'Restaurant #' + item.restaurantId;
          const formattedPrice = Number(item.price).toFixed(2);
          return `
            <tr id="item-row-${item.id}">
              <td class="fw-semibold text-dark">${escapeHtml(item.name)}</td>
              <td class="text-secondary"><i class="bi bi-shop me-1 text-danger"></i>${escapeHtml(restaurantName)}</td>
              <td>
                <span class="badge bg-danger-subtle text-danger border border-danger-subtle badge-category">
                  ${escapeHtml(item.category || 'General')}
                </span>
              </td>
              <td class="fw-bold text-danger">$${formattedPrice}</td>
              <td class="text-muted small text-truncate" style="max-width: 180px;">${escapeHtml(item.description || '-')}</td>
              <td class="text-end">
                <div class="btn-group btn-group-sm">
                  <button class="btn btn-outline-primary edit-btn" data-id="${item.id}" title="Edit">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-outline-danger delete-btn" data-id="${item.id}" title="Delete">
                    <i class="bi bi-trash3"></i>
                  </button>
                </div>
              </td>
            </tr>
          `;
        })
        .join('');

      menuItemsTableBody.innerHTML = rowsHtml;
    }
  };

  // Fetch Restaurants (GET /restaurants)
  const fetchRestaurants = async () => {
    try {
      const response = await fetch(RESTAURANTS_API);
      if (!response.ok) {
        throw new Error(`Failed to load restaurants: ${response.statusText}`);
      }
      restaurants = await response.json();

      // If no restaurants exist yet, auto seed one default restaurant for ease of use
      if (restaurants.length === 0) {
        await seedDefaultRestaurant();
      } else {
        renderRestaurantOptions();
      }
    } catch (error) {
      showAlert(`Error loading restaurants: ${error.message}`, 'danger');
    }
  };

  // Helper to seed a default restaurant if database is fresh
  const seedDefaultRestaurant = async () => {
    try {
      const res = await fetch(RESTAURANTS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'The Gourmet Kitchen',
          cuisine: 'Continental',
          address: '42 Baker Street',
        }),
      });
      if (res.ok) {
        const newR = await res.json();
        restaurants = [newR];
        renderRestaurantOptions();
      }
    } catch (err) {
      console.warn('Could not auto-seed restaurant:', err);
    }
  };

  // Fetch Menu Items (GET /menu-items) with x-api-key guard header
  const fetchMenuItems = async () => {
    try {
      const response = await fetch(MENU_ITEMS_API, {
        headers: {
          'x-api-key': getApiKey(),
        },
      });

      if (response.status === 401 || response.status === 403) {
        showAlert('Unauthorized: Invalid or missing API key in x-api-key header. Please check your API key in the navbar.', 'danger');
        menuItems = [];
        render();
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch menu items: ${response.statusText}`);
      }

      menuItems = await response.json();
      render();
    } catch (error) {
      showAlert(`Error fetching menu items: ${error.message}`, 'danger');
    }
  };

  // Form Validation & Submit (POST or PATCH /menu-items)
  menuItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const restaurantIdVal = restaurantSelect.value;
    const name = itemNameInput.value.trim();
    const priceVal = itemPriceInput.value.trim();
    const price = parseFloat(priceVal);
    const category = itemCategoryInput.value.trim();
    const description = itemDescriptionInput.value.trim();

    let isValid = true;

    // Validate restaurant
    if (!restaurantIdVal) {
      restaurantSelect.classList.add('is-invalid');
      isValid = false;
    } else {
      restaurantSelect.classList.remove('is-invalid');
    }

    // Validate name (non-empty string)
    if (!name) {
      itemNameInput.classList.add('is-invalid');
      isValid = false;
    } else {
      itemNameInput.classList.remove('is-invalid');
    }

    // Validate price (positive number)
    if (!priceVal || isNaN(price) || price <= 0) {
      itemPriceInput.classList.add('is-invalid');
      isValid = false;
    } else {
      itemPriceInput.classList.remove('is-invalid');
    }

    if (!isValid) {
      showAlert('Please fix the highlighted errors before submitting.', 'warning');
      return;
    }

    const payload = {
      restaurantId: parseInt(restaurantIdVal, 10),
      name,
      price,
      category: category || undefined,
      description: description || undefined,
    };

    const isEditing = Boolean(editingItemId);
    const url = isEditing ? `${MENU_ITEMS_API}/${editingItemId}` : MENU_ITEMS_API;
    const method = isEditing ? 'PATCH' : 'POST';

    try {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span> ${isEditing ? 'Updating...' : 'Saving...'}`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': getApiKey(),
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized: Missing or invalid x-api-key header.');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const msg = Array.isArray(errorData.message)
          ? errorData.message.join(', ')
          : errorData.message || 'Operation failed';
        throw new Error(msg);
      }

      const savedItem = await response.json();

      if (isEditing) {
        const idx = menuItems.findIndex((i) => String(i.id) === String(editingItemId));
        if (idx !== -1) {
          menuItems[idx] = savedItem;
        }
        showAlert(`Menu item "<strong>${escapeHtml(savedItem.name)}</strong>" updated successfully!`, 'success');
        resetForm();
      } else {
        menuItems.push(savedItem);
        showAlert(`Menu item "<strong>${escapeHtml(savedItem.name)}</strong>" created successfully!`, 'success');
        resetForm();
      }

      render();
    } catch (error) {
      showAlert(`Error: ${error.message}`, 'danger');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = isEditing ? '<i class="bi bi-check2-circle me-1"></i> Update Menu Item' : '<i class="bi bi-plus-lg me-1"></i> Add Menu Item';
    }
  });

  // Reset form to Add mode
  const resetForm = () => {
    editingItemId = null;
    editItemIdInput.value = '';
    menuItemForm.reset();
    [restaurantSelect, itemNameInput, itemPriceInput, itemCategoryInput, itemDescriptionInput].forEach((el) => {
      el.classList.remove('is-invalid');
    });
    formHeaderTitle.innerHTML = '<i class="bi bi-plus-circle-fill text-danger"></i> Add Menu Item';
    submitBtn.innerHTML = '<i class="bi bi-plus-lg me-1"></i> Add Menu Item';
    cancelEditBtn.classList.add('d-none');
  };

  cancelEditBtn.addEventListener('click', resetForm);

  // Edit item action
  const handleEdit = (id) => {
    const item = menuItems.find((i) => String(i.id) === String(id));
    if (!item) return;

    editingItemId = item.id;
    editItemIdInput.value = item.id;
    restaurantSelect.value = item.restaurantId;
    itemNameInput.value = item.name;
    itemPriceInput.value = item.price;
    itemCategoryInput.value = item.category || '';
    itemDescriptionInput.value = item.description || '';

    formHeaderTitle.innerHTML = '<i class="bi bi-pencil-square text-primary"></i> Edit Menu Item';
    submitBtn.innerHTML = '<i class="bi bi-check2-circle me-1"></i> Update Menu Item';
    cancelEditBtn.classList.remove('d-none');

    // Scroll to form smoothly
    menuItemForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Delete item action (DELETE /menu-items/:id)
  const handleDelete = async (id) => {
    const item = menuItems.find((i) => String(i.id) === String(id));
    const title = item ? item.name : 'Selected item';

    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`${MENU_ITEMS_API}/${id}`, {
        method: 'DELETE',
        headers: {
          'x-api-key': getApiKey(),
        },
      });

      if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized: Missing or invalid x-api-key header.');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to delete item');
      }

      menuItems = menuItems.filter((i) => String(i.id) !== String(id));
      if (editingItemId && String(editingItemId) === String(id)) {
        resetForm();
      }
      render();
      showAlert(`"${escapeHtml(title)}" was deleted successfully.`, 'info');
    } catch (error) {
      showAlert(`Delete failed: ${error.message}`, 'danger');
    }
  };

  // Handle Restaurant Creation via Modal (POST /restaurants)
  if (restaurantForm) {
    restaurantForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = restaurantNameInput.value.trim();
      const cuisine = restaurantCuisineInput.value.trim();
      const address = restaurantAddressInput.value.trim();

      if (!name) {
        restaurantNameInput.classList.add('is-invalid');
        return;
      }
      restaurantNameInput.classList.remove('is-invalid');

      try {
        const res = await fetch(RESTAURANTS_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, cuisine, address }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || 'Failed to create restaurant');
        }

        const newRestaurant = await res.json();
        restaurants.push(newRestaurant);
        renderRestaurantOptions();
        restaurantSelect.value = newRestaurant.id;

        restaurantForm.reset();
        if (newRestaurantModal) {
          newRestaurantModal.hide();
        }
        showAlert(`Restaurant "<strong>${escapeHtml(newRestaurant.name)}</strong>" added!`, 'success');
      } catch (err) {
        showAlert(`Failed to create restaurant: ${err.message}`, 'danger');
      }
    });
  }

  // Delegated click listeners for Edit and Delete buttons
  document.addEventListener('click', (e) => {
    const editBtn = e.target.closest('.edit-btn');
    if (editBtn) {
      const id = editBtn.getAttribute('data-id');
      handleEdit(id);
      return;
    }

    const deleteBtn = e.target.closest('.delete-btn');
    if (deleteBtn) {
      const id = deleteBtn.getAttribute('data-id');
      handleDelete(id);
      return;
    }
  });

  // Filter change listener
  restaurantFilter.addEventListener('change', (e) => {
    currentFilter = e.target.value;
    render();
  });

  // Switch view listeners
  viewCardsBtn.addEventListener('click', () => {
    currentView = 'cards';
    viewCardsBtn.classList.add('active');
    viewTableBtn.classList.remove('active');
    render();
  });

  viewTableBtn.addEventListener('click', () => {
    currentView = 'table';
    viewTableBtn.classList.add('active');
    viewCardsBtn.classList.remove('active');
    render();
  });

  // Dynamic input validation clearing
  [restaurantSelect, itemNameInput, itemPriceInput].forEach((input) => {
    input.addEventListener('input', () => {
      if (input.value && input.value.trim().length > 0) {
        input.classList.remove('is-invalid');
      }
    });
    input.addEventListener('change', () => {
      if (input.value && input.value.trim().length > 0) {
        input.classList.remove('is-invalid');
      }
    });
  });

  // Initial load
  (async () => {
    await fetchRestaurants();
    await fetchMenuItems();
  })();
});
