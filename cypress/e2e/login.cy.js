describe('login screen', () => {
    it('Successful login with valid values ', () => {
        cy.visit('/BooksApp');
        cy.login('test@test.com', 'test');
        cy.contains('Добро пожаловать test@test.com').should('be.visible');
    });

    it('Show error message on empty mail', () => {
        cy.visit('/BooksApp');
        cy.login(null, 'test');   
        cy.get('#mail')
            .then((element) => element[0].checkValidity())
            .should('be.false');  
        cy.get('#mail')
            .then((element) => element[0].validationMessage)
            .should('contain', 'Заполните это поле');      
    });

    it('Show error message on empty password', () => {
        cy.visit('/BooksApp');
        cy.login('test@test.com', null);   
        cy.get('#pass')
            .then((element) => element[0].checkValidity())
            .should('be.false'); 
        cy.get('#pass')
            .then((element) => element[0].validationMessage)
            .should('contain', 'Заполните это поле');    
    });

    it('Add new favorite book', () => {
        cy.visit('/BooksApp');
        cy.login('test@test.com', 'test');
        cy.contains('Books list').click();
        cy.contains('Add new').click();
        cy.get('#title').type('War and Peace');
        cy.get('#description').type('Friends the prince and count were looking for the meaning of life when the war of 1812 began. The prince died from a wound received at Borodino, having reconciled with his bride. The count survived and found family happiness with the bride of the prince.');
        cy.get('#authors').type('Lev Nikolaevich Tolstoi');
        cy.get('#favorite').click();
        cy.contains('Submit').click();
        cy.contains('War and Peace').should('be.visible');
    });

    it('Delete from favarite book', () => {
        cy.visit('/BooksApp');
        cy.login('test@test.com', 'test');
        cy.contains('Books list').click();
        cy.contains('Delete from favorite').click();
        cy.contains('War and Peace').should('be.visible');
    });

    it('Add new book after deletion', () => {
        cy.visit('/BooksApp');
        cy.login('test@test.com', 'test');
        cy.contains('Books list').click();
        cy.contains('Add new').click();
        cy.get('#title').type('Chameleon');
        cy.get('#description').type('The puppy bit a passerby. The policeman wanted to euthanize the puppy and fine his owner, but it turned out that the owner was the generals brother. The policeman was thrown into a fever. He ordered the puppy to be released, and scolded a passerby.');
        cy.get('#authors').type('Anton Pavlovich Chehov');
        cy.get('#favorite').click();
        cy.contains('Submit').click();
        cy.contains('Delete from favorite').should('be.visible');
    });
});