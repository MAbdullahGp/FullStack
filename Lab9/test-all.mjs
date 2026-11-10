// test-all.mjs
const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('=== STARTING TEST SUITE FOR LAB 09 ===\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  // --- TASK 1: Helmet, CORS, and Global ValidationPipe ---
  console.log('--- TASK 1: Bootstrap Security (Helmet, CORS, ValidationPipe) ---');
  {
    // Check helmet headers on GET /auth/login (or any request)
    const res = await fetch(`${BASE_URL}/users`);
    const nosniff = res.headers.get('x-content-type-options');
    assert(nosniff === 'nosniff', `Helmet header 'X-Content-Type-Options' is 'nosniff' (got '${nosniff}')`);
    
    // Check extra property rejection in ValidationPipe
    const regRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Hacker',
        email: 'hacker@example.com',
        password: 'Password123',
        isAdmin: true, // extra property!
      }),
    });
    const regJson = await regRes.json();
    assert(regRes.status === 400, `POST /auth/register with extra property returns 400 (got ${regRes.status})`);
    assert(
      JSON.stringify(regJson.message).includes('property isAdmin should not exist'),
      `Error contains 'property isAdmin should not exist' (got ${JSON.stringify(regJson.message)})`
    );
  }

  // Login helper
  async function login(email, password) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  }

  const normalLogin = await login('user@example.com', 'User1234');
  const userToken = normalLogin.access_token;

  const adminLogin = await login('admin@example.com', 'Admin1234');
  const adminToken = adminLogin.access_token;

  // --- TASK 3: Request ID Middleware ---
  console.log('\n--- TASK 3: Request ID Middleware ---');
  {
    const res = await fetch(`${BASE_URL}/notes`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    const reqId = res.headers.get('x-request-id');
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(reqId || '');
    assert(isUuid, `Response contains valid X-Request-Id UUID header: ${reqId}`);
  }

  // --- TASK 2: Notes Tags and Update ---
  console.log('\n--- TASK 2: Notes Tags and Update ---');
  {
    // 1. POST /notes with 6 tags -> 400
    const res6Tags = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        title: 'Too many tags',
        content: 'content',
        tags: ['t1', 't2', 't3', 't4', 't5', 't6'],
      }),
    });
    assert(res6Tags.status === 400, `POST /notes with 6 tags returns 400 (got ${res6Tags.status})`);

    // 2. POST /notes with tag > 20 chars -> 400
    const resLongTag = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        title: 'Long tag',
        content: 'content',
        tags: ['this_tag_is_longer_than_20_characters'],
      }),
    });
    assert(resLongTag.status === 400, `POST /notes with tag of 25+ chars returns 400 (got ${resLongTag.status})`);

    // 3. PositiveIntPipe check on PATCH /notes/abc -> 400
    const resInvalidId = await fetch(`${BASE_URL}/notes/abc`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ title: 'New' }),
    });
    assert(resInvalidId.status === 400, `PATCH /notes/abc returns 400 via PositiveIntPipe (got ${resInvalidId.status})`);

    // 4. Owner updates note 1 -> 200
    const resOwnerUpdate = await fetch(`${BASE_URL}/notes/1`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ title: 'New Zebra Title' }),
    });
    const updatedNote = await resOwnerUpdate.json();
    assert(resOwnerUpdate.status === 200, `PATCH /notes/1 by owner returns 200 (got ${resOwnerUpdate.status})`);
    assert(updatedNote.title === 'New Zebra Title', `Note title was updated to 'New Zebra Title'`);

    // 5. Register another user to test 403 Forbidden
    await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Second User',
        email: 'user2@example.com',
        password: 'User2Password1',
      }),
    });
    const user2Login = await login('user2@example.com', 'User2Password1');
    const user2Token = user2Login.access_token;

    const resOtherUser = await fetch(`${BASE_URL}/notes/1`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user2Token}`,
      },
      body: JSON.stringify({ title: 'Hacked' }),
    });
    assert(resOtherUser.status === 403, `PATCH /notes/1 by another normal user returns 403 (got ${resOtherUser.status})`);

    // 6. Admin can update any note -> 200
    const resAdminUpdate = await fetch(`${BASE_URL}/notes/1`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ title: 'Admin Updated Title' }),
    });
    assert(resAdminUpdate.status === 200, `PATCH /notes/1 by admin returns 200 (got ${resAdminUpdate.status})`);
  }

  // --- TASK 4: SortOrderPipe on GET /notes ---
  console.log('\n--- TASK 4: SortOrderPipe on GET /notes ---');
  {
    // 1. Missing order defaults to asc
    const resAsc = await fetch(`${BASE_URL}/notes`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    const notesAsc = await resAsc.json();
    assert(resAsc.status === 200, `GET /notes returns 200`);
    assert(
      notesAsc[0].title <= notesAsc[notesAsc.length - 1].title,
      `GET /notes defaults to ascending order ('${notesAsc[0].title}' <= '${notesAsc[notesAsc.length - 1].title}')`
    );

    // 2. order=DESC (case-insensitive) -> desc
    const resDesc = await fetch(`${BASE_URL}/notes?order=DESC`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    const notesDesc = await resDesc.json();
    assert(resDesc.status === 200, `GET /notes?order=DESC returns 200`);
    assert(
      notesDesc[0].title >= notesDesc[notesDesc.length - 1].title,
      `GET /notes?order=DESC sorts descending ('${notesDesc[0].title}' >= '${notesDesc[notesDesc.length - 1].title}')`
    );

    // 3. Invalid order -> 400
    const resInvalid = await fetch(`${BASE_URL}/notes?order=random`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    const invalidJson = await resInvalid.json();
    assert(resInvalid.status === 400, `GET /notes?order=random returns 400 (got ${resInvalid.status})`);
    assert(
      invalidJson.message === 'order must be asc or desc',
      `Error message is 'order must be asc or desc' (got '${invalidJson.message}')`
    );
  }

  // --- TASK 5: Change Password ---
  console.log('\n--- TASK 5: Change Password ---');
  {
    // 1. No token -> 401
    const resNoToken = await fetch(`${BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: 'User1234', newPassword: 'NewUser1234' }),
    });
    assert(resNoToken.status === 401, `No token returns 401 (got ${resNoToken.status})`);

    // 2. Wrong current password -> 401
    const resWrongCur = await fetch(`${BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ currentPassword: 'WrongPassword99', newPassword: 'NewUser1234' }),
    });
    assert(resWrongCur.status === 401, `Wrong current password returns 401 (got ${resWrongCur.status})`);

    // 3. Weak new password (e.g. 'abc') -> 400
    const resWeak = await fetch(`${BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ currentPassword: 'User1234', newPassword: 'abc' }),
    });
    assert(resWeak.status === 400, `Weak new password returns 400 (got ${resWeak.status})`);

    // 4. Same new password as current -> 400
    const resSame = await fetch(`${BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ currentPassword: 'User1234', newPassword: 'User1234' }),
    });
    assert(resSame.status === 400, `New password same as current returns 400 (got ${resSame.status})`);

    // 5. Valid change password -> 200 { "message": "Password updated" }
    const resSuccess = await fetch(`${BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ currentPassword: 'User1234', newPassword: 'UpdatedUserPass1' }),
    });
    const successJson = await resSuccess.json();
    assert(resSuccess.status === 200, `Valid change password returns 200 (got ${resSuccess.status})`);
    assert(successJson.message === 'Password updated', `Response message is 'Password updated'`);
    assert(!successJson.passwordHash, `Response does not contain passwordHash`);

    // 6. Old password fails login -> 401
    const resOldLogin = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'user@example.com', password: 'User1234' }),
    });
    assert(resOldLogin.status === 401, `Login with old password afterwards returns 401 (got ${resOldLogin.status})`);

    // 7. New password succeeds login -> 200
    const resNewLogin = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'user@example.com', password: 'UpdatedUserPass1' }),
    });
    const newLoginJson = await resNewLogin.json();
    assert(resNewLogin.status === 200, `Login with new password afterwards returns 200 (got ${resNewLogin.status})`);
    assert(!!newLoginJson.access_token, `New login returns valid access_token`);
  }

  // --- TASK 6: Authorization (Admin Users List) ---
  console.log('\n--- TASK 6: Authorization (Admin Users List) ---');
  {
    // 1. No token -> 401
    const resNoAuth = await fetch(`${BASE_URL}/users`);
    assert(resNoAuth.status === 401, `GET /users with no token returns 401 (got ${resNoAuth.status})`);

    // 2. Normal user -> 403
    const resUser = await fetch(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    assert(resUser.status === 403, `GET /users with normal user token returns 403 (got ${resUser.status})`);

    // 3. Admin -> 200
    const resAdmin = await fetch(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const usersList = await resAdmin.json();
    assert(resAdmin.status === 200, `GET /users with admin token returns 200 (got ${resAdmin.status})`);
    assert(Array.isArray(usersList) && usersList.length > 0, `Returns array of users`);
    
    // Check that fields are id, name, email, role and passwordHash is NOT present
    const firstUser = usersList[0];
    const hasRequiredFields = 'id' in firstUser && 'name' in firstUser && 'email' in firstUser && 'role' in firstUser;
    const hasNoHash = !('passwordHash' in firstUser);
    assert(hasRequiredFields && hasNoHash, `User objects contain id, name, email, role and NEVER passwordHash`);
  }

  console.log(`\n========================================`);
  console.log(`TOTAL TESTS: ${passed + failed}`);
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log(`========================================`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error(err);
  process.exit(1);
});
