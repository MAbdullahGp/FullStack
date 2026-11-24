// Q1. Library Book Tracker - Frontend Application
document.addEventListener('DOMContentLoaded', () => {
  // State
  let books = [];
  let currentFilter = 'ALL';
  let currentView = 'cards'; // 'cards' | 'table'

  // DOM Elements
  const form = document.getElementById('addBookForm');
  const titleInput = document.getElementById('bookTitle');
  const authorInput = document.getElementById('bookAuthor');
  const categoryInput = document.getElementById('bookCategory');
  const yearInput = document.getElementById('bookYear');
  const categoryFilter = document.getElementById('categoryFilter');
  const cardsView = document.getElementById('cardsView');
  const tableView = document.getElementById('tableView');
  const booksTableBody = document.getElementById('booksTableBody');
  const emptyState = document.getElementById('emptyState');
  const bookCountBadge = document.getElementById('bookCountBadge');
  const alertContainer = document.getElementById('alertContainer');
  const viewCardsBtn = document.getElementById('viewCardsBtn');
  const viewTableBtn = document.getElementById('viewTableBtn');

  const API_URL = '/books';

  // Utility to show Bootstrap Alert
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
    }, 4000);
  };

  // Populate Categories Filter using map & filter
  const updateCategoryOptions = () => {
    // Array methods: map to extract categories, filter to keep unique non-empty ones
    const allCategories = books.map((b) => (b.category ? b.category.trim() : ''));
    const uniqueCategories = allCategories
      .filter((cat, index, self) => cat.length > 0 && self.indexOf(cat) === index)
      .sort((a, b) => a.localeCompare(b));

    const selectedValue = categoryFilter.value || 'ALL';
    const optionsHtml = ['<option value="ALL">All Categories</option>']
      .concat(
        uniqueCategories.map(
          (cat) => `<option value="${escapeHtml(cat)}">${escapeHtml(cat)}</option>`,
        ),
      )
      .join('');

    categoryFilter.innerHTML = optionsHtml;
    if (uniqueCategories.includes(selectedValue) || selectedValue === 'ALL') {
      categoryFilter.value = selectedValue;
    } else {
      categoryFilter.value = 'ALL';
      currentFilter = 'ALL';
    }
  };

  // Escape HTML to prevent XSS
  const escapeHtml = (str) => {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // Render books according to current filter and view
  const render = () => {
    // Filter books array using arrow function and filter()
    const filteredBooks = books.filter((book) => {
      if (currentFilter === 'ALL') return true;
      return (book.category || '').trim().toLowerCase() === currentFilter.trim().toLowerCase();
    });

    bookCountBadge.textContent = `${filteredBooks.length} ${filteredBooks.length === 1 ? 'book' : 'books'}`;

    if (filteredBooks.length === 0) {
      cardsView.innerHTML = '';
      booksTableBody.innerHTML = '';
      cardsView.classList.add('d-none');
      tableView.classList.add('d-none');
      emptyState.classList.remove('d-none');
      return;
    }

    emptyState.classList.add('d-none');

    if (currentView === 'cards') {
      cardsView.classList.remove('d-none');
      tableView.classList.add('d-none');

      // Use map to transform book items into Card HTML strings
      const cardsHtml = filteredBooks
        .map(
          (book) => `
            <div class="col-md-6" id="book-card-${escapeHtml(book.id)}">
              <div class="card h-100 shadow-sm border-0 book-card">
                <div class="card-body d-flex flex-column">
                  <div class="d-flex justify-content-between align-items-start mb-2">
                    <span class="badge bg-primary-subtle text-primary border border-primary-subtle badge-category">
                      ${escapeHtml(book.category)}
                    </span>
                    <span class="badge bg-light text-secondary border">
                      <i class="bi bi-calendar3 me-1"></i>${escapeHtml(book.year)}
                    </span>
                  </div>
                  <h5 class="card-title text-dark fw-bold mb-1">${escapeHtml(book.title)}</h5>
                  <h6 class="card-subtitle text-muted mb-3">
                    <i class="bi bi-person me-1"></i>${escapeHtml(book.author)}
                  </h6>
                  <div class="mt-auto pt-2 border-top d-flex justify-content-end">
                    <button class="btn btn-outline-danger btn-sm delete-btn" data-id="${escapeHtml(book.id)}">
                      <i class="bi bi-trash3 me-1"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `,
        )
        .join('');

      cardsView.innerHTML = cardsHtml;
    } else {
      cardsView.classList.add('d-none');
      tableView.classList.remove('d-none');

      // Use map to generate Table rows
      const tableRowsHtml = filteredBooks
        .map(
          (book) => `
            <tr id="book-row-${escapeHtml(book.id)}">
              <td class="fw-semibold text-dark">${escapeHtml(book.title)}</td>
              <td class="text-secondary">${escapeHtml(book.author)}</td>
              <td>
                <span class="badge bg-primary-subtle text-primary border border-primary-subtle badge-category">
                  ${escapeHtml(book.category)}
                </span>
              </td>
              <td class="text-secondary">${escapeHtml(book.year)}</td>
              <td class="text-end">
                <button class="btn btn-outline-danger btn-sm delete-btn" data-id="${escapeHtml(book.id)}" title="Delete book">
                  <i class="bi bi-trash3"></i>
                </button>
              </td>
            </tr>
          `,
        )
        .join('');

      booksTableBody.innerHTML = tableRowsHtml;
    }
  };

  // Fetch all books (GET /books)
  const fetchBooks = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Failed to load books: ${response.statusText}`);
      }
      books = await response.json();
      updateCategoryOptions();
      render();
    } catch (error) {
      showAlert(`Error fetching books: ${error.message}`, 'danger');
    }
  };

  // Form Validation & Submit (POST /books)
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const category = categoryInput.value.trim();
    const yearValue = yearInput.value.trim();
    const year = Number(yearValue);

    let isValid = true;

    // Check title
    if (!title) {
      titleInput.classList.add('is-invalid');
      isValid = false;
    } else {
      titleInput.classList.remove('is-invalid');
    }

    // Check author
    if (!author) {
      authorInput.classList.add('is-invalid');
      isValid = false;
    } else {
      authorInput.classList.remove('is-invalid');
    }

    // Check category
    if (!category) {
      categoryInput.classList.add('is-invalid');
      isValid = false;
    } else {
      categoryInput.classList.remove('is-invalid');
    }

    // Check year
    if (!yearValue || isNaN(year) || year < 1000 || year > 2100) {
      yearInput.classList.add('is-invalid');
      isValid = false;
    } else {
      yearInput.classList.remove('is-invalid');
    }

    if (!isValid) {
      showAlert('Please fill in all required fields with valid data.', 'warning');
      return;
    }

    const payload = {
      title,
      author,
      category,
      year,
    };

    try {
      const submitBtn = document.getElementById('submitBtn');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> Adding...';

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = Array.isArray(errorData.message)
          ? errorData.message.join(', ')
          : errorData.message || 'Failed to add book';
        throw new Error(message);
      }

      const createdBook = await response.json();
      books.push(createdBook);

      // Reset form
      form.reset();
      [titleInput, authorInput, categoryInput, yearInput].forEach((input) => {
        input.classList.remove('is-invalid');
      });

      updateCategoryOptions();
      render();
      showAlert(`Book "<strong>${escapeHtml(createdBook.title)}</strong>" added successfully!`, 'success');
    } catch (error) {
      showAlert(`Failed to create book: ${error.message}`, 'danger');
    } finally {
      const submitBtn = document.getElementById('submitBtn');
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="bi bi-plus-lg me-1"></i> Add Book';
    }
  });

  // Event Delegation for Delete (DELETE /books/:id)
  const handleDelete = async (bookId) => {
    if (!bookId) return;

    const bookToDelete = books.find((b) => String(b.id) === String(bookId));
    const bookTitle = bookToDelete ? bookToDelete.title : 'Selected book';

    if (!confirm(`Are you sure you want to delete "${bookTitle}"?`)) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${encodeURIComponent(bookId)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to delete book');
      }

      // Filter out deleted book from state
      books = books.filter((b) => String(b.id) !== String(bookId));
      updateCategoryOptions();
      render();
      showAlert(`"${escapeHtml(bookTitle)}" has been deleted.`, 'info');
    } catch (error) {
      showAlert(`Failed to delete book: ${error.message}`, 'danger');
    }
  };

  // Click event listener on both containers
  document.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.delete-btn');
    if (deleteBtn) {
      const id = deleteBtn.getAttribute('data-id');
      handleDelete(id);
    }
  });

  // Filter change event listener
  categoryFilter.addEventListener('change', (e) => {
    currentFilter = e.target.value;
    render();
  });

  // View switch event listeners
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

  // Input listener to clear validation styles dynamically
  [titleInput, authorInput, categoryInput, yearInput].forEach((input) => {
    input.addEventListener('input', () => {
      if (input.value.trim().length > 0) {
        input.classList.remove('is-invalid');
      }
    });
  });

  // Initial load
  fetchBooks();
});
