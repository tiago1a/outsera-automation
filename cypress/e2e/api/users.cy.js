import postPayloads from '../../fixtures/api/postPayloads.json'

describe('JSONPlaceholder API - Posts', () => {

  const baseUrl = 'https://jsonplaceholder.typicode.com'

  // ============================================
  // GET /posts
  // ============================================

  it('GET /posts - should return list of posts', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/posts`
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
    })
  })

  it('GET /posts - should have valid structure', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/posts`
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
      expect(response.body.length).to.be.greaterThan(0)
      
      const firstPost = response.body[0]
      expect(firstPost).to.have.all.keys('userId', 'id', 'title', 'body')
    })
  })

  // ============================================
  // GET /posts/{id}
  // ============================================

  it('GET /posts/1 - should return specific post', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/posts/1`
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id', 1)
      expect(response.body).to.have.property('userId')
      expect(response.body).to.have.property('title')
      expect(response.body).to.have.property('body')
    })
  })

  it('GET /posts/99999 - should return 404 for non-existent post', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/posts/99999`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404)
    })
  })

  // ============================================
  // POST /posts
  // ============================================

  it('POST /posts - should create a post with valid payload', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/posts`,
      body: postPayloads.validPost
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('id')
      expect(response.body.title).to.eq(postPayloads.validPost.title)
      expect(response.body.body).to.eq(postPayloads.validPost.body)
      expect(response.body.userId).to.eq(postPayloads.validPost.userId)
    })
  })

  it('POST /posts - should handle invalid payload', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/posts`,
      body: postPayloads.invalidUser,
      failOnStatusCode: false
    }).then((response) => {
      // JSONPlaceholder não valida payloads, então retorna 201
      expect([201, 400]).to.include(response.status)
    })
  })

  it('POST /posts - should create post with only title', () => {
    const minimalPayload = { title: 'Minimal Post' }
    
    cy.request({
      method: 'POST',
      url: `${baseUrl}/posts`,
      body: minimalPayload
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('id')
      expect(response.body.title).to.eq('Minimal Post')
    })
  })

  // ============================================
  // PUT /posts/{id}
  // ============================================

  it('PUT /posts/1 - should update a post completely', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/posts/1`,
      body: postPayloads.validPost
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.id).to.eq(1)
      expect(response.body.title).to.eq(postPayloads.validPost.title)
    })
  })

  it('PUT /posts/1 - should update only specific fields', () => {
    const partialUpdate = { title: 'Updated Title' }
    
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/posts/1`,
      body: partialUpdate
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.title).to.eq('Updated Title')
    })
  })

  // ============================================
  // PATCH /posts/{id}
  // ============================================

  it('PATCH /posts/1 - should partially update a post', () => {
    const partialUpdate = { title: 'Patched Title' }
    
    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/posts/1`,
      body: partialUpdate
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.title).to.eq('Patched Title')
      expect(response.body.id).to.eq(1)
    })
  })

  it('PATCH /posts/2 - should update just the body', () => {
    const bodyUpdate = { body: 'This is the updated body content' }
    
    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/posts/2`,
      body: bodyUpdate
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.body).to.eq('This is the updated body content')
    })
  })

  // ============================================
  // DELETE /posts/{id}
  // ============================================

  it('DELETE /posts/1 - should delete a post', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/posts/1`
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('DELETE /posts/99999 - should return 200 for non-existent post', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/posts/99999`
    }).then((response) => {
      // JSONPlaceholder sempre retorna 200 para DELETE
      expect(response.status).to.eq(200)
    })
  })

})

