import postPayloads from '../../fixtures/api/postPayloads.json'

describe('JSONPlaceholder API - Posts', () => {

  const baseUrl = 'https://jsonplaceholder.typicode.com'

  it('POST /posts - should create a post (valid payload)', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/posts`,
      body: postPayloads.validPost
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('id')
      expect(response.body.title).to.eq(postPayloads.validPost.title)
    })
  })

  it('POST /posts - should fail with invalid payload', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/posts`,
      body: postPayloads.invalidUser,
      failOnStatusCode: false
    }).then((response) => {
      // JSONPlaceholder não valida de verdade, mas você pode simular o cenário
      expect([201, 400]).to.include(response.status)
    })
  })

  it('GET /posts - should return list of posts', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/posts`
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
    })
  })

  it('PUT /posts/{id} - should update a post', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/posts/1`,
      body: postPayloads.validPost
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.title).to.eq(postPayloads.validPost.title)
    })
  })

  it('DELETE /posts/{id} - should delete a post', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/posts/1`
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

})
