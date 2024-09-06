describe('Cart Page', () => {
    beforeEach(() => {
        // Clearing localStorage & visiting the cart page
        cy.clearLocalStorage();
        cy.visit('/shop/cart');
    });

    it('should display empty cart and trigger server action if localStorage is cleared', () => {
        // Simulate clearing localStorage to trigger server action
        cy.window().then((win) => {
            win.localStorage.removeItem('cart-storage');
        });

        // Simulate the server action returning an empty cart
        cy.reload(); // Reload to trigger any server-side effect if present

        // Verify the empty cart state after the server action
        cy.contains('Your cart is empty').should('exist');
    });

    it('should display product after adding to the cart and restore from cart store ', () => {
        // Navigate to the products page
        cy.visit('/shop/products');

        // Add first two products to the cart
        cy.get('[data-cy=add-to-cart-button]').should('have.length.gte', 1);
        cy.get('[data-cy=add-to-cart-button]').first().click();

        // Navigate to the cart page
        cy.visit('/shop/cart');

        // Verify that the cart displays the added products
        cy.get('ul > li').should('have.length', 1); // Expecting a product in the cart
    });


    it('should handle checkout button states', () => {
        // Simulate adding products to the cart
        cy.visit('/shop/products');
        cy.get('[data-cy=add-to-cart-button]').should('have.length.gte', 2);
        cy.get('[data-cy=add-to-cart-button]').first().click();
        cy.wait(500);
        cy.get('[data-cy=add-to-cart-button]').eq(1).click();
        cy.wait(1000);
        // Navigate to the cart page
        cy.visit('/shop/cart');

        // Simulate clicking the checkout button
        cy.get('[data-cy=checkout-button]').contains('Checkout').click();

        // Button should now show "Processing..."
        cy.get('[data-cy=checkout-button]').contains('Processing...').should('exist');

        // Simulate successful checkout and redirection
        cy.wait(2000); // Simulate delay

        // Button should now show "Order Placed!"
        cy.get('[data-cy=checkout-button]').contains('Order Placed!').should('exist');

        // Verify URL redirection
        cy.url().should('include', '/shop/cart/checkout-success');
    });
});
