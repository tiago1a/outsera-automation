/**
 * RequestHelper - Configurações centralizadas para requests de API
 * Gerencia headers, timeout e opções padrão
 */
class RequestHelper {
  static get baseUrl() {
    return 'https://jsonplaceholder.typicode.com';
  }

  static get defaultHeaders() {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  static get defaultTimeout() {
    return 30000; // 30 segundos
  }

  /**
   * Retorna opções base para qualquer request
   */
  static getBaseOptions(failOnStatusCode = true) {
    return {
      headers: this.defaultHeaders,
      timeout: this.defaultTimeout,
      failOnStatusCode,
    };
  }

  /**
   * Opções para requests que podem falhar (cenários negativos)
   */
  static getNegativeOptions() {
    return {
      ...this.getBaseOptions(false),
    };
  }

  /**
   * Opções para requests GET
   */
  static getGetOptions(failOnStatusCode = true) {
    return this.getBaseOptions(failOnStatusCode);
  }

  /**
   * Opções para requests POST
   */
  static getPostOptions(body, failOnStatusCode = true) {
    return {
      ...this.getBaseOptions(failOnStatusCode),
      body,
    };
  }

  /**
   * Opções para requests PUT
   */
  static getPutOptions(body, failOnStatusCode = true) {
    return {
      ...this.getBaseOptions(failOnStatusCode),
      body,
    };
  }

  /**
   * Opções para requests PATCH
   */
  static getPatchOptions(body, failOnStatusCode = true) {
    return {
      ...this.getBaseOptions(failOnStatusCode),
      body,
    };
  }

  /**
   * Opções para requests DELETE
   */
  static getDeleteOptions(failOnStatusCode = true) {
    return this.getBaseOptions(failOnStatusCode);
  }

  /**
   * Monta URL completa
   */
  static buildUrl(endpoint) {
    return `${this.baseUrl}${endpoint}`;
  }

  /**
   * Cria options combinando opções customizadas com as padrão
   */
  static mergeOptions(customOptions = {}, baseOptions = null) {
    return {
      ...(baseOptions || this.getBaseOptions()),
      ...customOptions,
    };
  }
}

export default RequestHelper;
