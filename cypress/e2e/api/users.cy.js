/**
 * JSONPlaceholder API Tests
 * Testes de API utilizando arquitetura escalável:
 * - JsonPlaceholderService (camada de serviço)
 * - ApiAssertions (validações reutilizáveis)
 * - PostFactory (geração de payloads dinâmicos)
 */
import JsonPlaceholderService from '../../support/api/JsonPlaceholderService';
import ApiAssertions from '../../support/api/helpers/ApiAssertions';
import PostFactory from '../../support/api/factories/PostFactory';

describe('JSONPlaceholder API - Posts', () => {
  // ============================================
  // GET /posts
  // ============================================

  describe('GET /posts', () => {
    it('should return list of posts with status 200', () => {
      JsonPlaceholderService.getPosts().then((response) => {
        ApiAssertions.expectStatus(response, 200);
        ApiAssertions.expectArray(response);
      });
    });

    it('should return posts with valid structure', () => {
      JsonPlaceholderService.getPosts().then((response) => {
        ApiAssertions.expectStatus(response, 200);
        ApiAssertions.expectPostsArrayStructure(response);
      });
    });

    it('should return posts within acceptable response time', () => {
      JsonPlaceholderService.getPosts().then((response) => {
        ApiAssertions.expectStatus(response, 200);
        ApiAssertions.expectResponseTime(response, 2000);
      });
    });
  });

  // ============================================
  // GET /posts/{id}
  // ============================================

  describe('GET /posts/{id}', () => {
    it('should return specific post with status 200', () => {
      JsonPlaceholderService.getPostById(1).then((response) => {
        ApiAssertions.expectStatus(response, 200);
        ApiAssertions.expectPostStructure(response);
        ApiAssertions.expectProperty(response, 'id', 1);
      });
    });

    it('should return 404 for non-existent post', () => {
      JsonPlaceholderService.getPostById(99999, false).then((response) => {
        ApiAssertions.expectStatus(response, 404);
      });
    });

    it('should return valid structure for any post id', () => {
      JsonPlaceholderService.getPostById(5).then((response) => {
        ApiAssertions.expectStatus(response, 200);
        ApiAssertions.expectPostStructure(response);
        ApiAssertions.expectProperty(response, 'id', 5);
      });
    });
  });

  // ============================================
  // GET /posts?userId={id}
  // ============================================

  describe('GET /posts?userId={id}', () => {
    it('should return posts filtered by user id', () => {
      JsonPlaceholderService.getPostsByUser(1).then((response) => {
        ApiAssertions.expectStatus(response, 200);
        ApiAssertions.expectArray(response);
        response.body.forEach((post) => {
          expect(post.userId).to.eq(1);
        });
      });
    });
  });

  // ============================================
  // POST /posts
  // ============================================

  describe('POST /posts', () => {
    it('should create a post with valid payload', () => {
      const payload = PostFactory.createPost();
      JsonPlaceholderService.createPost(payload).then((response) => {
        ApiAssertions.expectStatus(response, 201);
        ApiAssertions.expectCreatedId(response);
        ApiAssertions.expectProperty(response, 'title', payload.title);
        ApiAssertions.expectProperty(response, 'body', payload.body);
        ApiAssertions.expectProperty(response, 'userId', payload.userId);
      });
    });

    it('should create post with only title (minimal payload)', () => {
      const payload = PostFactory.createPostWithOnlyTitle();
      JsonPlaceholderService.createPost(payload).then((response) => {
        ApiAssertions.expectStatus(response, 201);
        ApiAssertions.expectCreatedId(response);
        ApiAssertions.expectProperty(response, 'title', payload.title);
      });
    });

    it('should handle extra fields in payload', () => {
      const payload = PostFactory.createPostWithExtraFields();
      JsonPlaceholderService.createPost(payload).then((response) => {
        ApiAssertions.expectStatus(response, 201);
        ApiAssertions.expectCreatedId(response);
      });
    });

    it('should return 201 even with empty fields (JSONPlaceholder behavior)', () => {
      const payload = PostFactory.createPostWithEmptyFields();
      JsonPlaceholderService.createPost(payload, false).then((response) => {
        // JSONPlaceholder não valida payload, retorna 201
        ApiAssertions.expectStatus(response, 201);
      });
    });
  });

  // ============================================
  // PUT /posts/{id}
  // ============================================

  describe('PUT /posts/{id}', () => {
    it('should completely update a post', () => {
      const payload = PostFactory.createUpdatePayload({ id: 1 });
      JsonPlaceholderService.updatePost(1, payload).then((response) => {
        ApiAssertions.expectStatus(response, 200);
        ApiAssertions.expectProperty(response, 'id', 1);
        ApiAssertions.expectProperty(response, 'title', payload.title);
        ApiAssertions.expectProperty(response, 'body', payload.body);
      });
    });

    it('should update only specific fields via PUT', () => {
      const payload = PostFactory.createPatchPayload();
      JsonPlaceholderService.updatePost(1, payload).then((response) => {
        ApiAssertions.expectStatus(response, 200);
        ApiAssertions.expectProperty(response, 'title', payload.title);
      });
    });
  });

  // ============================================
  // PATCH /posts/{id}
  // ============================================

  describe('PATCH /posts/{id}', () => {
    it('should partially update post title', () => {
      const payload = PostFactory.createPatchPayload();
      JsonPlaceholderService.patchPost(1, payload).then((response) => {
        ApiAssertions.expectStatus(response, 200);
        ApiAssertions.expectProperty(response, 'id', 1);
        ApiAssertions.expectProperty(response, 'title', payload.title);
      });
    });

    it('should partially update only the body', () => {
      const payload = PostFactory.createBodyPatchPayload();
      JsonPlaceholderService.patchPost(2, payload).then((response) => {
        ApiAssertions.expectStatus(response, 200);
        ApiAssertions.expectProperty(response, 'id', 2);
        ApiAssertions.expectProperty(response, 'body', payload.body);
      });
    });

    it('should update with mixed fields', () => {
      const payload = PostFactory.createPost({
        title: 'Mixed Update',
        body: 'Updated body content',
      });
      JsonPlaceholderService.patchPost(3, payload).then((response) => {
        ApiAssertions.expectStatus(response, 200);
        ApiAssertions.expectProperty(response, 'title', payload.title);
        ApiAssertions.expectProperty(response, 'body', payload.body);
      });
    });
  });

  // ============================================
  // DELETE /posts/{id}
  // ============================================

  describe('DELETE /posts/{id}', () => {
    it('should delete a post with status 200', () => {
      JsonPlaceholderService.deletePost(1).then((response) => {
        ApiAssertions.expectStatus(response, 200);
      });
    });

    it('should return 200 for non-existent post (JSONPlaceholder behavior)', () => {
      JsonPlaceholderService.deletePost(99999).then((response) => {
        ApiAssertions.expectStatus(response, 200);
      });
    });

    it('should successfully delete different post ids', () => {
      JsonPlaceholderService.deletePost(5).then((response) => {
        ApiAssertions.expectStatus(response, 200);
      });

      JsonPlaceholderService.deletePost(10).then((response) => {
        ApiAssertions.expectStatus(response, 200);
      });
    });
  });

  // ============================================
  // Contract Validation Tests
  // ============================================

  describe('Contract Validation', () => {
    it('should validate post response structure', () => {
      JsonPlaceholderService.getPostById(1).then((response) => {
        ApiAssertions.expectStatus(response, 200);
        ApiAssertions.expectPostStructure(response);
      });
    });

    it('should validate posts list response structure', () => {
      JsonPlaceholderService.getPosts().then((response) => {
        ApiAssertions.expectStatus(response, 200);
        ApiAssertions.expectPostsArrayStructure(response);
      });
    });

    it('should validate created post structure', () => {
      const payload = PostFactory.createPost();
      JsonPlaceholderService.createPost(payload).then((response) => {
        ApiAssertions.expectStatus(response, 201);
        ApiAssertions.expectCreatedId(response);
        ApiAssertions.expectPostStructure(response);
      });
    });
  });
});
