/**
 * ApiAssertions - Assertions reutilizáveis para validação de APIs
 * Centraliza todas as validações para maior manutenibilidade
 */
class ApiAssertions {
  /**
   * Valida status code da resposta
   */
  static expectStatus(response, expectedStatus) {
    expect(response.status).to.eq(expectedStatus);
  }

  /**
   * Valida que resposta tem status de sucesso (2xx)
   */
  static expectSuccess(response) {
    expect(response.status).to.be.at.least(200).and.lessThan(300);
  }

  /**
   * Valida que resposta tem status de erro (4xx ou 5xx)
   */
  static expectError(response) {
    expect(response.status).to.be.at.least(400);
  }

  /**
   * Valida tempo de resposta (em milissegundos)
   */
  static expectResponseTime(response, maxMs) {
    expect(response.duration).to.be.lessThan(maxMs);
  }

  /**
   * Valida que corpo é array
   */
  static expectArray(response, property = null) {
    if (property) {
      expect(response.body[property]).to.be.an('array');
    } else {
      expect(response.body).to.be.an('array');
    }
  }

  /**
   * Valida que corpo é objeto
   */
  static expectObject(response, property = null) {
    if (property) {
      expect(response.body[property]).to.be.an('object');
    } else {
      expect(response.body).to.be.an('object');
    }
  }

  /**
   * Valida propriedade obrigatória existe
   */
  static expectProperty(response, property, value = null) {
    expect(response.body).to.have.property(property);
    if (value !== null) {
      expect(response.body[property]).to.eq(value);
    }
  }

  /**
   * Valida múltiplas propriedades
   */
  static expectProperties(response, properties) {
    properties.forEach((prop) => {
      expect(response.body).to.have.property(prop);
    });
  }

  /**
   * Valida que propriedade não está vazia
   */
  static expectNotEmpty(response, property) {
    expect(response.body[property]).to.not.be.empty;
  }

  /**
   * Valida tipo de dado da propriedade
   */
  static expectType(response, property, type) {
    expect(response.body[property]).to.be.a(type);
  }

  /**
   * Valida que resposta contém item específico no array
   */
  static expectArrayContainsItemWithProperty(response, property, value) {
    expect(response.body).to.be.an('array');
    const item = response.body.find((i) => i[property] === value);
    expect(item).to.not.be.undefined;
  }

  /**
   * Valida número de itens no array
   */
  static expectArrayLength(response, expectedLength, property = null) {
    const array = property ? response.body[property] : response.body;
    expect(array).to.have.lengthOf(expectedLength);
  }

  /**
   * Valida mensagem de erro
   */
  static expectErrorMessage(response, message) {
    expect(response.body).to.have.property('message', message);
  }

  /**
   * Valida estrutura de paginação
   */
  static expectPagination(response) {
    expect(response.body).to.have.all.keys('page', 'per_page', 'total', 'total_pages');
    expect(response.body.page).to.be.a('number');
    expect(response.body.per_page).to.be.a('number');
    expect(response.body.total).to.be.a('number');
    expect(response.body.total_pages).to.be.a('number');
  }

  /**
   * Valida ID gerado após criação
   */
  static expectCreatedId(response) {
    expect(response.body).to.have.property('id');
    expect(response.body.id).to.be.a('number');
  }

  /**
   * Valida headers da resposta
   */
  static expectHeader(response, header, value = null) {
    expect(response.headers).to.have.property(header);
    if (value !== null) {
      expect(response.headers[header]).to.eq(value);
    }
  }

  /**
   * Valida content type
   */
  static expectContentType(response, type = 'application/json') {
    expect(response.headers['content-type']).to.include(type);
  }
}

export default ApiAssertions;

