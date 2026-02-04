/**
 * BaseService - Classe base para serviços de API
 * Contém métodos HTTP genéricos reutilizáveis para todos os serviços
 * 
 * Para criar um novo serviço:
 * 1. Estenda esta classe
 * 2. Defina o baseUrl no construtor
 * 3. Adicione métodos específicos se necessário
 * 
 * @example
 * class UserService extends BaseService {
 *   constructor() {
 *     super('https://api.example.com/users');
 *   }
 *   
 *   getByEmail(email) {
 *     return this.get(`/email/${email}`);
 *   }
 * }
 */
class BaseService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * Executa GET request
   * @param {string} endpoint - Endpoint da API
   * @param {Object} options - Opções adicionais
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
   * Executa PUT request (atualização completa)
   * @param {string} endpoint - Endpoint da API
   * @param {Object} body - Corpo da requisição
   * @param {Object} options - Opções adicionais
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
   * Executa PATCH request (atualização parcial)
   * @param {string} endpoint - Endpoint da API
   * @param {Object} body - Corpo da requisição
   * @param {Object} options - Opções adicionais
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
   */
  delete(endpoint, options = {}) {
    return cy.request({
      method: 'DELETE',
      url: `${this.baseUrl}${endpoint}`,
      ...options,
    });
  }

  /**
   * Monta URL com query params
   * @param {string} endpoint - Endpoint base
   * @param {Object} params - Parâmetros de query
   */
  buildUrlWithParams(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return queryString ? `${endpoint}?${queryString}` : endpoint;
  }
}

export default BaseService;
