describe("User can create a quiz by choosing category and difficulty", () => {
  before(() => {
    cy.intercept("POST", "**/api/quizzes", {
      fixture: "apiResult.json",
    }).as("getQuizzes");
    cy.visit("/");
    cy.get("[data-cy=category]").select("history", { force: true });
    cy.get("[data-cy=difficulty]").select("hard", { force: true });
    cy.get("[data-cy=create-button]").click({ force: true });
  });

  it("is expected to make a POST request to the API", () => {
    cy.wait("@getQuizzes").its("request.method").should("eq", "POST");
  });

  it("is expected to display the first question of the Quiz", () => {
    cy.get("[data-cy=quiz-question]").should(
      "contain.text",
      "When did Canada leave the confederation to become their own nation?"
    );
  });

  it("is expected to display 4 answers", () => {
    cy.get("[data-cy=quiz-answers]").children().should("have.length", 4);
  });
});
