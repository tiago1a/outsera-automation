/**
 * PostFactory - Factory para criação de payloads de Posts
 * Gera dados dinâmicos para testes de API
 */
class PostFactory {
  /**
   * Cria um post completo
   */
  static createPost(overrides = {}) {
    return {
      title: 'Test Post Title',
      body: 'This is the body content of the test post.',
      userId: 1,
      ...overrides,
    };
  }

  /**
   * Cria um post com título mínimo
   */
  static createPostWithOnlyTitle() {
    return {
      title: 'Minimal Post Title',
    };
  }

  /**
   * Cria um post com título longo (para testes de validação)
   */
  static createPostWithLongTitle() {
    return {
      title: 'A'.repeat(500),
      body: 'Long title test for validation purposes.',
      userId: 1,
    };
  }

  /**
   * Cria um post com campos vazios (para testes negativos)
   */
  static createPostWithEmptyFields() {
    return {
      title: '',
      body: '',
      userId: null,
    };
  }

  /**
   * Cria um post com dados personalizados
   */
  static createPostWithData(title, body, userId = 1) {
    return {
      title,
      body,
      userId,
    };
  }

  /**
   * Cria payload de atualização completa (PUT)
   */
  static createUpdatePayload(overrides = {}) {
    return {
      id: 1,
      title: 'Updated Post Title',
      body: 'This is the updated body content.',
      userId: 1,
      ...overrides,
    };
  }

  /**
   * Cria payload de atualização parcial (PATCH)
   */
  static createPatchPayload(overrides = {}) {
    return {
      title: 'Patched Title',
      ...overrides,
    };
  }

  /**
   * Cria payload de atualização parcial apenas do body
   */
  static createBodyPatchPayload() {
    return {
      body: 'This is the updated body content.',
    };
  }

  /**
   * Cria post com campos extras (para testes de validação)
   */
  static createPostWithExtraFields() {
    return {
      title: 'Post with Extra Fields',
      body: 'Body content',
      userId: 1,
      extraField: 'should be ignored',
      anotherField: 123,
    };
  }

  /**
   * Cria post com tipo de dados incorreto (para testes negativos)
   */
  static createPostWithWrongTypes() {
    return {
      title: 12345,  // Deveria ser string
      body: true,    // Deveria ser string
      userId: 'one', // Deveria ser number
    };
  }

  /**
   * Gera lista de posts para testes em lote
   */
  static createPostList(count = 5) {
    return Array.from({ length: count }, (_, index) =>
      this.createPostWithData(
        `Post Title ${index + 1}`,
        `Body content for post ${index + 1}`,
        index + 1
      )
    );
  }
}

export default PostFactory;
