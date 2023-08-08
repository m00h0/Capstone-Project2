const checke = require('./addlike.js');

test('add function', () => {
  document.body.innerHTML = `
      <div class='todo-list'>
      </div>
    `;
  test();
  const tasks = document.querySelectorAll('.todo-list .task');
  expect(tasks).toHaveLength(1);
});

checke();
