import { EXPERIAN_SCORE_DJANGO_URL } from "../util/urls";

const ExperianScore = async () => {
  try {
    const response = await fetch(EXPERIAN_SCORE_DJANGO_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    if (response.ok) {
      const res = await response.json();
      if(!res.response.success) return { success: false}
      return { success: true, score: res.response.results.commercialScore.score };
    } else {
      return { success: false };
    }
  } catch (e) {
    console.log(e);
    return { success: false };
  }
};

export default ExperianScore;
