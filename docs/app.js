function startApp() {
  window.location.href = "signup.html";
}

function login() {
  window.location.href = "login.html";
}

// =========================
// CREDITWISE AI — SHARED DATA
// =========================

const CreditWise = {

  getScore() {
    const income = Number(localStorage.getItem("monthlyIncome"));
    const savings = Number(localStorage.getItem("monthlySavings"));
    const spending = Number(localStorage.getItem("monthlySpending"));

    // No financial information yet
    if (!income || income <= 0) {
      return 72;
    }

    // Savings: up to 40 points
    const savingsRate = Math.min(savings / income, 0.30);
    const savingsPoints = (savingsRate / 0.30) * 40;

    // Spending discipline: up to 30 points
    const spendingRate = Math.min(spending / income, 1);
    const spendingPoints = (1 - spendingRate) * 30;

    // Income information provided: 30 points
    const stabilityPoints = 30;

    const score = Math.round(
      savingsPoints +
      spendingPoints +
      stabilityPoints
    );

    return Math.max(0, Math.min(100, score));
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
    const income = Number(localStorage.getItem("monthlyIncome")) || 0;
    const savings = Number(localStorage.getItem("monthlySavings")) || 0;
    const spending = Number(localStorage.getItem("monthlySpending")) || 0;

    return {
      name: localStorage.getItem("userName") || "Demo User",
      goal: localStorage.getItem("creditwiseGoal") || "Build savings",
      income: income ? `₦${income.toLocaleString()}` : "₦0",
      savings: savings ? `₦${savings.toLocaleString()}` : "₦0",
      spending: spending ? `₦${spending.toLocaleString()}` : "₦0"
    };
  },

  resetDemo() {
    localStorage.removeItem("trustScore");
    localStorage.removeItem("improvementPlan");
    localStorage.removeItem("dataConsent");
    localStorage.removeItem("monthlyIncome");
    localStorage.removeItem("monthlySavings");
    localStorage.removeItem("monthlySpending");
  }

};

// =========================
// SERVICE WORKER
// =========================

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then(() => console.log("CreditWise AI app ready"))
      .catch(error => console.error("Service worker error:", error));
  });
}
