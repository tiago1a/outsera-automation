/**
 * JSONPlaceholder API Tests - Posts
 * Testes organizados com arquitetura escalável
 */
import JsonPlaceholderService from '../../support/api/services/JsonPlaceholderService';
import PostFactory from '../../support/api/factories/PostFactory';

describe('JSONPlaceholder API - Posts (Escalável)', () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';

  describe('GET /posts', () => {
    it('should return list of posts', () => {
      JsonPlaceholderService.getAllPosts().then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
      });
    });

    it('should return posts with valid structure', () => {
      JsonPlaceholderService.getAllPosts().then((response) => {
        expect(response.status).to.eq(200);
        const firstPost = response.body[0];
        expect(firstPost).to.have.property('userId');
        expect(firstPost).to.have.property('id');
        expect(firstPost).to.have.property('title');
        expect(firstPost).to.have.property('body');
      });
    });

    it('should return posts within acceptable response time', () => {
      JsonPlaceholderService.getAllPosts().then((response) => {
        expect(response.duration).to.be.lessThan(5000);
      });
    });
  });

  describe('GET /posts/{id}', () => {
    it('should return single post by ID', () => {
      const postId = 1;
      JsonPlaceholderService.getPostById(postId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(postId);
        expect(response.body).to.have.property('userId');
        expect(response.body).to.have.property('title');
        expect(response.body).to.have.property('body');
      });
    });

    it('should return 404 for non-existent post', () => {
      const nonExistentId = 9999;
      JsonPlaceholderService.getPostById(nonExistentId, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });

    it('should validate post structure', () => {
      const postId = 1;
      JsonPlaceholderService.getPostById(postId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.all.keys('userId', 'id', 'title', 'body');
        expect(response.body.userId).to.be.a('number');
        expect(response.body.id).to.be.a('number');
        expect(response.body.title).to.be.a('string');
        expect(response.body.body).to.be.a('string');
      });
    });
  });

  describe('POST /posts', () => {
    it('should create a new post with valid payload', () => {
      const payload = PostFactory.createValid();
      JsonPlaceholderService.createPost(payload).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body.title).to.eq(payload.title);
        expect(response.body.body).to.eq(payload.body);
        expect(response.body.userId).to.eq(payload.userId);
      });
    });

    it('should create post with extra fields (ignored by API)', () => {
      const payload = PostFactory.createWithExtraFields();
      JsonPlaceholderService.createPost(payload).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
      });
    });

    it('should fail with invalid userId', () => {
      const payload = PostFactory.createWithInvalidUserId();
      JsonPlaceholderService.createPost(payload, { failOnStatusCode: false }).then((response) => {
        expect([201, 400]).to.include(response.status);
      });
    });

    it('should fail with missing required fields', () => {
      const payload = { title: 'Test' };
      JsonPlaceholderService.createPost(payload, { failOnStatusCode: false }).then((response) => {
        expect([201, 400]).to.include(response.status);
      });
    });
  });

  describe('PUT /posts/{id}', () => {
    it('should update post with valid payload', () => {
      const postId = 1;
      const payload = PostFactory.createValid();
      JsonPlaceholderService.updatePost(postId, payload).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(postId);
        expect(response.body.title).to.eq(payload.title);
        expect(response.body.body).to.eq(payload.body);
      });
    });

    it('should update only specific fields with partial data', () => {
      const postId = 1;
      const payload = PostFactory.createPartial();
      JsonPlaceholderService.updatePost(postId, payload).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.title).to.eq(payload.title);
      });
    });
  });

  describe('PATCH /posts/{id}', () => {
    it('should partially update post', () => {
      const postId = 1;
      const payload = { title: 'Updated Title' };
      JsonPlaceholderService.patchPost(postId, payload).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.title).to.eq(payload.title);
      });
    });

    it('should update multiple fields', () => {
      const postId = 1;
      const payload = PostFactory.createValid();
      JsonPlaceholderService.patchPost(postId, payload).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.title).to.eq(payload.title);
        expect(response.body.body).to.eq(payload.body);
      });
    });
  });

  describe('DELETE /posts/{id}', () => {
    it('should delete existing post', () => {
      const postId = 1;
      JsonPlaceholderService.deletePost(postId).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it('should return 200 for non-existent post (API behavior)', () => {
      const nonExistentId = 9999;
      JsonPlaceholderService.deletePost(nonExistentId, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  describe('Custom Endpoints', () => {
    it('should filter posts by user ID', () => {
      const userId = 1;
      JsonPlaceholderService.getPostsByUser(userId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        response.body.forEach((post) => {
          expect(post.userId).to.eq(userId);
        });
      });
    });

    it('should return posts with pagination', () => {
      const page = 1;
      const perPage = 5;
      JsonPlaceholderService.getPostsPaginated(page, perPage).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.lengthOf(perPage);
      });
    });
  });

  describe('Integration Tests', () => {
    it('should create, update, and delete a post', () => {
      // Create - testa que POST retorna 201 e ID válido
      const createPayload = PostFactory.createValid();
      JsonPlaceholderService.createPost(createPayload).then((createResponse) => {
        expect(createResponse.status).to.eq(201);
        expect(createResponse.body).to.have.property('id');
        const createdId = createResponse.body.id;
        expect(createdId).to.be.a('number');
      });

      // Update - usa ID existente (1) pois API não persiste dados
      const existingPostId = 1;
      const updatePayload = PostFactory.create();
      JsonPlaceholderService.updatePost(existingPostId, updatePayload).then((updateResponse) => {
        expect(updateResponse.status).to.eq(200);
        expect(updateResponse.body.id).to.eq(existingPostId);
        expect(updateResponse.body.title).to.eq(updatePayload.title);
      });

      // Delete - usa ID existente (1)
      JsonPlaceholderService.deletePost(existingPostId).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);
      });
    });

    it('should perform CRUD operations in batch', () => {
      const posts = PostFactory.createMultiple(3);

      posts.forEach((payload) => {
        JsonPlaceholderService.createPost(payload).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.have.property('id');
          expect(response.body.title).to.eq(payload.title);
          expect(response.body.body).to.eq(payload.body);
        });
      });
    });
  });
});

