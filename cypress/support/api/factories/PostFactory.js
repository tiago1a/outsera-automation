/**
 * PostFactory - Factory para criação de payloads de Post
 * Implementa padrão Factory para geração dinâmica de dados de teste
 */
class PostFactory {
  constructor() {
    this.counter = 1;
  }

  /**
   * Gera um título único
   */
  generateTitle() {
    return `Post Title ${Date.now()}_${this.counter++}`;
  }

  /**
   * Gera um corpo de post
   */
  generateBody() {
    return `This is the body content for post ${this.counter}`;
  }

  /**
   * Gera um ID de usuário válido
   */
  generateUserId() {
    return Math.floor(Math.random() * 10) + 1;
  }

  /**
   * Cria payload válido completo
   */
  createValid() {
    return {
      title: this.generateTitle(),
      body: this.generateBody(),
      userId: this.generateUserId(),
    };
  }

  /**
   * Cria payload com título vazio (para testes negativos)
   */
  createWithEmptyTitle() {
    return {
      title: '',
      body: this.generateBody(),
      userId: this.generateUserId(),
    };
  }

  /**
   * Cria payload com corpo vazio
   */
  createWithEmptyBody() {
    return {
      title: this.generateTitle(),
      body: '',
      userId: this.generateUserId(),
    };
  }

  /**
   * Cria payload com userId inválido
   */
  createWithInvalidUserId() {
    return {
      title: this.generateTitle(),
      body: this.generateBody(),
      userId: -1,
    };
  }

  /**
   * Cria payload com campos extras (para testes de validação)
   */
  createWithExtraFields() {
    return {
      title: this.generateTitle(),
      body: this.generateBody(),
      userId: this.generateUserId(),
      extraField: 'shouldBeIgnored',
      anotherField: 12345,
    };
  }

  /**
   * Cria payload parcial (para PATCH)
   */
  createPartial() {
    return {
      title: this.generateTitle(),
    };
  }

  /**
   * Cria múltiplos posts para testes em lote
   */
  createMultiple(count = 3) {
    return Array.from({ length: count }, () => this.createValid());
  }

  /**
   * Cria payload customizado
   */
  create(customData = {}) {
    return {
      title: customData.title || this.generateTitle(),
      body: customData.body || this.generateBody(),
      userId: customData.userId || this.generateUserId(),
      ...customData,
    };
  }
}

export default new PostFactory();

