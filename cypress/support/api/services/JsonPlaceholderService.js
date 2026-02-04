/**
 * JsonPlaceholderService - Service específico para API JSONPlaceholder
 * Herda de BaseService e adiciona métodos específicos da API
 */
import BaseService from '../base/BaseService';

class JsonPlaceholderService extends BaseService {
  constructor() {
    super('https://jsonplaceholder.typicode.com');
    this.endpoint = '/posts';
  }

  // ==================== CRUD Operations ====================

  /**
   * Busca todos os posts
   * @returns {Object} cy.request response chainable
   */
  getAllPosts(options = {}) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}${this.endpoint}`,
      ...options,
    });
  }

  /**
   * Busca post por ID
   * @param {number} id - ID do post
   * @returns {Object} cy.request response chainable
   */
  getPostById(id, options = {}) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}${this.endpoint}/${id}`,
      ...options,
    });
  }

  /**
   * Cria novo post
   * @param {Object} payload - Dados do post
   * @returns {Object} cy.request response chainable
   */
  createPost(payload, options = {}) {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}${this.endpoint}`,
      body: payload,
      ...options,
    });
  }

  /**
   * Atualiza post completo (PUT)
   * @param {number} id - ID do post
   * @param {Object} payload - Dados do post
   * @returns {Object} cy.request response chainable
   */
  updatePost(id, payload, options = {}) {
    return cy.request({
      method: 'PUT',
      url: `${this.baseUrl}${this.endpoint}/${id}`,
      body: payload,
      ...options,
    });
  }

  /**
   * Atualiza post parcial (PATCH)
   * @param {number} id - ID do post
   * @param {Object} payload - Dados parciais
   * @returns {Object} cy.request response chainable
   */
  patchPost(id, payload, options = {}) {
    return cy.request({
      method: 'PATCH',
      url: `${this.baseUrl}${this.endpoint}/${id}`,
      body: payload,
      ...options,
    });
  }

  /**
   * Deleta post
   * @param {number} id - ID do post
   * @returns {Object} cy.request response chainable
   */
  deletePost(id, options = {}) {
    return cy.request({
      method: 'DELETE',
      url: `${this.baseUrl}${this.endpoint}/${id}`,
      ...options,
    });
  }

  // ==================== Custom Endpoints ====================

  /**
   * Busca posts de usuário específico
   * @param {number} userId - ID do usuário
   * @returns {Object} cy.request response chainable
   */
  getPostsByUser(userId) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}${this.endpoint}`,
      qs: { userId },
    });
  }

  /**
   * Busca posts com paginação
   * @param {number} page - Página
   * @param {number} perPage - Itens por página
   * @returns {Object} cy.request response chainable
   */
  getPostsPaginated(page = 1, perPage = 10) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}${this.endpoint}`,
      qs: { _page: page, _limit: perPage },
    });
  }
}

export default new JsonPlaceholderService();

