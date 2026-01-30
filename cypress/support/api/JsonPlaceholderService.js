export class JsonPlaceholderService {

  static getPosts() {
    return cy.request({
      method: "GET",
      url: "/posts",
      //failOnStatusCode: false,
    })
  }

  static getPostById(id) {
    return cy.request({
      method: "GET",
      url: `/posts/${id}`,
      //failOnStatusCode: false,
    })
  }

  static createPost(payload) {
    return cy.request({
      method: "POST",
      url: "/posts",
      body: payload,
      //failOnStatusCode: false,
    })
  }

  static updatePost(id, payload) {
    return cy.request({
      method: "PUT",
      url: `/posts/${id}`,
      body: payload,
      //failOnStatusCode: false,
    })
  }

  static deletePost(id) {
    return cy.request({
      method: "DELETE",
      url: `/posts/${id}`,
      //failOnStatusCode: false,
    })
  }
}
