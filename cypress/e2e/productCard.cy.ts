describe('Product Card Component', () => {
    beforeEach(() => {
      // Visit the product listing page
      cy.visit('/shop/products');
    });
  
    it('renders the product card correctly', () => {
      cy.get('[data-cy=product-card]').first().within(() => {
        cy.get('[data-cy=product-title]').should('exist'); // Ensure title element is present
        cy.get('[data-cy=product-price]').should('exist'); // Ensure price element is present
        cy.get('[data-cy=product-image]').should('exist'); // Ensure image element is present
        cy.get('[data-cy=product-image]').should('have.attr', 'src'); // Ensure image has a src attribute
      });
    });
  
    it('switches product image on variant hover', () => {
      cy.get('[data-cy=product-card]').first().within(() => {
        cy.get('[data-cy=variant-circles]').first().trigger('mouseover');
        cy.get('[data-cy=product-image]').should('have.attr', 'src'); // Ensure image src attribute is present after hover
      });
    });
  
    it('adds the product to the cart', () => {
      cy.get('[data-cy=product-card]').first().within(() => {
        cy.get('[data-cy=add-to-cart-button]').should('exist'); // Ensure add to cart button is present
        cy.get('[data-cy=add-to-cart-button]').click(); // Add the product to the cart
        cy.get('[data-cy=remove-from-cart-button]').should('be.visible'); // Ensure remove button becomes visible
      });
    });
  
    it('removes the product from the cart', () => {
      cy.get('[data-cy=product-card]').first().within(() => {
        cy.get('[data-cy=add-to-cart-button]').click(); // Ensure product is added to the cart
        cy.get('[data-cy=remove-from-cart-button]').click(); // Remove the product from the cart
        cy.get('[data-cy=add-to-cart-button]').should('be.visible'); // Ensure add button becomes visible again
      });
    });
  });
  
  