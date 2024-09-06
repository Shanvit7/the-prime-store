describe("Product Preview", () => {
  beforeEach(() => {
    // Visiting the product listing page
    cy.visit("/shop/products");

    // Open the product preview modal
    cy.get("[data-cy=product-card")
      .first()
      .within(() => {
        cy.get("[data-cy=product-title-link]").should("exist");
        cy.get("[data-cy=product-title-link]").click(); // Opens the modal
      });
    cy.wait(1000);

    cy.url().should("match", /\/shop\/preview\/\d+/);
  });

  it("renders the product preview correctly", () => {
    cy.get("[data-cy=product-modal]").within(() => {
      cy.get("[data-cy=product-preview-title]").should("exist");
      cy.get("[data-cy=product-preview-brand]").should("exist");
      cy.get("[data-cy=product-preview-price").should("exist");
      cy.get("[data-cy=product-preview-image]").should("exist");
      cy.get("[data-cy=product-preview-image]").should("have.attr", "src");
    });
  });

  it("switches product image on variant hover", () => {
    cy.get("[data-cy=product-modal]").within(() => {
      cy.get("[data-cy=variant-circles]").first().trigger("mouseover");
      cy.get("[data-cy=product-preview-image]").should("have.attr", "src");
    });
  });

  it("add & remove product in the cart, then close the product preview", () => {
    cy.get("[data-cy=product-modal]").within(() => {
      // Check if 'Add to Cart' or 'Remove from Cart' button is visible, and perform the relevant action
      cy.get("[data-cy=add-to-cart-button]").then(($button) => {
        if ($button.is(":visible")) {
          // Add the product to the cart
          cy.get("[data-cy=add-to-cart-button]").should("be.visible").click();
          // Verify 'Remove from Cart' button is visible after adding to cart
          cy.get("[data-cy=remove-from-cart-button]").should("be.visible");
        } else {
          // Remove the product from the cart
          cy.get("[data-cy=remove-from-cart-button]")
            .should("be.visible")
            .click();
          // Verify 'Add to Cart' button is visible after removing from cart
          cy.get("[data-cy=add-to-cart-button]").should("be.visible");
        }
        cy.get("[data-cy=modal-close]").should("exist");
        cy.get("[data-cy=modal-close]").click();
        cy.url().should("include", "/shop/products");
      });
    });
  });
});
