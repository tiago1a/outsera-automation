/**
 * Page Object para Página de Produtos
 * Contém seletores e métodos para operações na página de inventário
 */
import AssertionHelper from "../helpers/AssertionHelper";
import { PAGE_TITLES, URLs } from "../constants/Messages";

class ProductsPage {
  // Seletores
  elements = {
    productsTitle: ".title",
    productList: ".inventory_list",
    productCards: ".inventory_item",
    productNames: ".inventory_item_name",
    productPrices: ".inventory_item_price",
    addToCartButtons: '[data-test^="add-to-cart"]',
    removeButtons: '[data-test^="remove"]',
    cartBadge: ".shopping_cart_badge",
    cartIcon: ".shopping_cart_link",
    sortContainer: '[data-test="product-sort-container"]',
    menuButton: "#react-burger-menu-btn",
    logoutLink: "#logout_sidebar_link",
    resetAppLink: "#reset_sidebar_link",
    twitterLink: ".social-twitter > a",
    facebookLink: ".social-facebook > a",
    linkedinLink: ".social-linkedin > a",
    footerText: ".footer",
  };

  // Seletores individuais de produto
  getProductSelector(productId) {
    return `[data-test="add-to-cart-${productId}"]`;
  }

  getProductRemoveSelector(productId) {
    return `[data-test="remove-${productId}"]`;
  }

  /**
   * Verifica que está na página de produtos
   */
  verifyOnProductsPage() {
    AssertionHelper.shouldExist(this.elements.productsTitle);
    AssertionHelper.shouldContainText(
      this.elements.productsTitle,
      PAGE_TITLES.INVENTORY
    );
    return this;
  }

  /**
   * Verifica lista de produtos visível
   */
  verifyProductsListVisible() {
    AssertionHelper.shouldExist(this.elements.productList);
    AssertionHelper.shouldHaveLength(this.elements.productCards, 6);
    return this;
  }

  /**
   * Adiciona produto ao carrinho
   */
  addProductToCart(productId) {
    cy.get(this.getProductSelector(productId)).click();
    return this;
  }

  /**
   * Adiciona produto ao carrinho por índice
   */
  addProductByIndex(index) {
    cy.get(this.elements.addToCartButtons).eq(index).click();
    return this;
  }

  /**
   * Remove produto do carrinho
   */
  removeProductFromCart(productId) {
    cy.get(this.getProductRemoveSelector(productId)).click();
    return this;
  }

  /**
   * Adiciona todos os produtos ao carrinho
   */
  addAllProductsToCart() {
    cy.get(this.elements.addToCartButtons).each(($btn) => {
      cy.wrap($btn).click();
    });
    return this;
  }

  /**
   * Verifica que produto foi adicionado (botão mudou para remove)
   */
  verifyProductAdded(productId) {
    AssertionHelper.shouldExist(this.getProductRemoveSelector(productId));
    return this;
  }

  /**
   * Verifica badge do carrinho
   */
  verifyCartBadge(count) {
    if (count > 0) {
      AssertionHelper.shouldContainText(
        this.elements.cartBadge,
        count.toString()
      );
    } else {
      AssertionHelper.shouldNotBeVisible(this.elements.cartBadge);
    }
    return this;
  }

  /**
   * Clica no ícone do carrinho
   */
  clickCartIcon() {
    cy.get(this.elements.cartIcon).click();
    return this;
  }

  /**
   * Ordena produtos por valor
   */
  sortProducts(sortOption) {
    cy.get(this.elements.sortContainer).select(sortOption);
    return this;
  }

  /**
   * Verifica ordenação por preço (low to high)
   */
  verifyPriceSortAscending() {
    const prices = [];
    cy.get(this.elements.productPrices).each(($el) => {
      prices.push(parseFloat($el.text().replace("$", "")));
    });

    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).to.deep.equal(sortedPrices);
    return this;
  }

  /**
   * Verifica ordenação por preço (high to low)
   */
  verifyPriceSortDescending() {
    const prices = [];
    cy.get(this.elements.productPrices).each(($el) => {
      prices.push(parseFloat($el.text().replace("$", "")));
    });

    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).to.deep.equal(sortedPrices);
    return this;
  }

  /**
   * Abre menu lateral
   */
  openMenu() {
    cy.get(this.elements.menuButton).click();
    return this;
  }

  /**
   * Faz logout
   */
  logout() {
    this.openMenu();
    cy.get(this.elements.logoutLink).click();
    return this;
  }

  /**
   * Verifica links de redes sociais
   */
  verifySocialLinks() {
    AssertionHelper.shouldExist(this.elements.twitterLink);
    AssertionHelper.shouldExist(this.elements.facebookLink);
    AssertionHelper.shouldExist(this.elements.linkedinLink);
    return this;
  }

  /**
   * Verifica footer
   */
  verifyFooter() {
    AssertionHelper.shouldExist(this.elements.footerText);
    return this;
  }

  /**
   * Conta produtos na página
   */
  getProductsCount() {
    return cy.get(this.elements.productCards).its("length");
  }

  /**
   * Retorna lista de nomes de produtos
   */
  getProductNames() {
    const names = [];
    cy.get(this.elements.productNames).each(($el) => {
      names.push($el.text());
    });
    return cy.wrap(names);
  }
}

export default ProductsPage;

