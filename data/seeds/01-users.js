
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, username: 'Anna', password: 'anna1234', email: 'anna@anna.co.uk' },
        { id: 2, username: 'Dom', password: 'dom1234', email: 'dom@dom.co.uk' },
        { id: 3, username: 'Francis', password: 'francis1234', email: 'francis@francis.co.uk' }
      ]);
    });
};
