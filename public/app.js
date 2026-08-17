function startApp() {
  window.location.href = "signup.html";
}

function login() {
  alert("Login screen coming next.");
}
// =========================
// CREDITWISE AI — SHARED DATA
// =========================

const CreditWise = {

  getScore() {
    const savedScore = localStorage.getItem("trustScore");

    if (savedScore === null) {
      localStorage.setItem("trustScore", "72");
      return 72;
    }

    return Number(savedScore);
  },

  setScore(score) {
    const safeScore = Math.max(0, Math.min(100, Number(score)));
    localStorage.setItem("trustScore", String(safeScore));
    return safeScore;
  },

  improveScore(points) {
    const currentScore = this.getScore();
    return this.setScore(currentScore + Number(points));
  },

  getUser() {
    return {
      name: localStorage.getItem("userName") || "Demo User",
      goal: localStorage.getItem("financialGoal") || "Build savings",
      income: "₦245,000",
      savings: "₦48,500",
      spending: "₦126,300"
    };
  },

  resetDemo() {
    localStorage.removeItem("trustScore");
    localStorage.removeItem("improvementPlan");
    localStorage.removeItem("dataConsent");
  }

};
