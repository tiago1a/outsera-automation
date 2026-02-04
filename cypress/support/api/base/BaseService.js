/**
 * BaseService - Classe base para serviços de API
 * Contém métodos HTTP genéricos reutilizáveis
 */
class BaseService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * Executa GET request
   * @param {string} endpoint - Endpoint da API
   * @param {Object} options - Opções adicionais
   * @returns {Object} Response object (deve ser usado com .then())
   */
  get(endpoint, options = {}) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}${endpoint}`,
      ...options,
    });
  }

  /**
   * Executa POST request
   * @param {string} endpoint - Endpoint da API
   * @param {Object} body - Corpo da requisição
   * @param {Object} options - Opções adicionais
   * @returns {Object} Response object (deve ser usado com .then())
   */
  post(endpoint, body, options = {}) {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}${endpoint}`,
      body,
      ...options,
    });
  }

  /**
   * Executa PUT request
   * @param {string} endpoint - Endpoint da API
   * @param {Object} body - Corpo da requisição
   * @param {Object} options - Opções adicionais
   * @returns {Object} Response object (deve ser usado com .then())
   */
  put(endpoint, body, options = {}) {
    return cy.request({
      method: 'PUT',
      url: `${this.baseUrl}${endpoint}`,
      body,
      ...options,
    });
  }

  /**
   * Executa PATCH request
   * @param {string} endpoint - Endpoint da API
   * @param {Object} body - Corpo da requisição
   * @param {Object} options - Opções adicionais
   * @returns {Object} Response object (deve ser usado com .then())
   */
  patch(endpoint, body, options = {}) {
    return cy.request({
      method: 'PATCH',
      url: `${this.baseUrl}${endpoint}`,
      body,
      ...options,
    });
  }

  /**
   * Executa DELETE request
   * @param {string} endpoint - Endpoint da API
   * @param {Object} options - Opções adicionais
   * @returns {Object} Response object (deve ser usado com .then())
   */
  delete(endpoint, options = {}) {
    return cy.request({
      method: 'DELETE',
      url: `${this.baseUrl}${endpoint}`,
      ...options,
    });
  }

  /**
   * Wrapper para requests que retorna Promise
   * @param {Object} cyRequest - Resultado do cy.request()
   * @returns {Promise} Promise que resolve com a resposta
   */
  toPromise(cyRequest) {
    return new Promise((resolve) => {
      cyRequest.then((response) => {
        resolve(response);
      });
    });
  }
}

export default BaseService;

