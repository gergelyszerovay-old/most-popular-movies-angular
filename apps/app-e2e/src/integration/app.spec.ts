describe('app', () => {

  it('it should display the app\'s title', () => {
    cy.get('h4').contains('Most popular movies');
  });

});

