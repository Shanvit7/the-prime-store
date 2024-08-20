// API ENV VARS
const productApiUrl = Cypress.env('productApiUrl');
const productListingLimit = Cypress.env('productListingLimit');
describe('Product Listing Page', () => {
  beforeEach(() => {
    // Navigate to the product listing page
    cy.visit('/shop/products');
  });

  it('displays loading skeleton while products are being fetched', () => {
    // Verify that the loading skeleton is visible initially
    cy.get('[data-cy=product-loading-skeleton]').should('be.visible');
  });

  it('displays "No Products" message when there are no products', () => {
    // Simulate no products available
    cy.intercept('GET', `${productApiUrl}/products?limit=${productListingLimit}&skip=0&select=id,title,price,thumbnail,images`, { products: [] }).as('getProducts');
    cy.reload();
    
    // Wait for the products API call to complete
    cy.wait('@getProducts');
    
    // Verify that the "No Products" message is displayed
    cy.get('[data-cy=no-products]').should('be.visible');
  });

  it('displays product cards when products are available', () => {
    // Verify that product cards are visible after loading
    cy.get('[data-cy=product-card]').should('have.length.at.least', 1);
  });

  it('checks the product details in the card', () => {
    // Ensure that product details are correctly displayed
    cy.get('[data-cy=product-card]').first().within(() => {
      cy.get('[data-cy=product-title]').should('not.be.empty');
      cy.get('[data-cy=product-price]').should('not.be.empty');
      cy.get('[data-cy=product-image]').should('be.visible');
    });
  });
});
