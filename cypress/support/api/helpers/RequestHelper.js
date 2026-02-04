/**
 * RequestHelper - Configurações centralizadas para requisições
 * Gerencia headers, autenticação e configurações globais
 */
class RequestHelper {
  constructor() {
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  /**
   * Retorna headers padrão
   */
  getDefaultHeaders() {
    return { ...this.defaultHeaders };
  }

  /**
   * Retorna headers com autenticação Bearer
   */
  getAuthHeaders(token) {
    return {
      ...this.defaultHeaders,
      Authorization: `Bearer ${token}`,
    };
  }

  /**
   * Retorna opções base para requisição
   */
  getBaseOptions(additionalOptions = {}) {
    return {
      headers: this.defaultHeaders,
      failOnStatusCode: true,
      ...additionalOptions,
    };
  }

  /**
   * Retorna opções para requisição que pode falhar
   */
  getOptionalOptions() {
    return {
      ...this.getBaseOptions(),
      failOnStatusCode: false,
    };
  }

  /**
   * Retorna opções com timeout customizado
   */
  getTimeoutOptions(timeout = 30000) {
    return {
      ...this.getBaseOptions(),
      timeout,
    };
  }

  /**
   * Faz merge de objetos de options
   */
  mergeOptions(...optionsObjects) {
    return Object.assign({}, ...optionsObjects);
  }

  /**
   * Serializa objeto para query string
   */
  toQueryString(params) {
    return Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  }

  /**
   * Retorna URL com query params
   */
  buildUrlWithParams(baseUrl, endpoint, params = {}) {
    const queryString = this.toQueryString(params);
    return queryString ? `${baseUrl}${endpoint}?${queryString}` : `${baseUrl}${endpoint}`;
  }
}

export default new RequestHelper();

