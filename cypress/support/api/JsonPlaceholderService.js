import RequestHelper from './helpers/RequestHelper';

export class JsonPlaceholderService {
  static get baseUrl() {
    return 'https://jsonplaceholder.typicode.com';
  }

  // ============================================
  // GET Operations
  // ============================================

  static getPosts(failOnStatusCode = true) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}/posts`,
      ...RequestHelper.getGetOptions(failOnStatusCode),
    });
  }

  static getPostById(id, failOnStatusCode = true) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}/posts/${id}`,
      ...RequestHelper.getGetOptions(failOnStatusCode),
    });
  }

  static getPostsByUser(userId, failOnStatusCode = true) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}/posts?userId=${userId}`,
      ...RequestHelper.getGetOptions(failOnStatusCode),
    });
  }

  // ============================================
  // POST Operations
  // ============================================

  static createPost(body, failOnStatusCode = true) {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}/posts`,
      ...RequestHelper.getPostOptions(body, failOnStatusCode),
    });
  }

  // ============================================
  // PUT Operations
  // ============================================

  static updatePost(id, body, failOnStatusCode = true) {
    return cy.request({
      method: 'PUT',
      url: `${this.baseUrl}/posts/${id}`,
      ...RequestHelper.getPutOptions(body, failOnStatusCode),
    });
  }

  // ============================================
  // PATCH Operations
  // ============================================

  static patchPost(id, body, failOnStatusCode = true) {
    return cy.request({
      method: 'PATCH',
      url: `${this.baseUrl}/posts/${id}`,
      ...RequestHelper.getPatchOptions(body, failOnStatusCode),
    });
  }

  // ============================================
  // DELETE Operations
  // ============================================

  static deletePost(id, failOnStatusCode = true) {
    return cy.request({
      method: 'DELETE',
      url: `${this.baseUrl}/posts/${id}`,
      ...RequestHelper.getDeleteOptions(failOnStatusCode),
    });
  }
}

export default JsonPlaceholderService;

