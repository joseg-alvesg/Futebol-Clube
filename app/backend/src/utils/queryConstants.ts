const homeTeamLeaderBoardQuery = `
SELECT
  t.team_name AS name,
  SUM(
    CASE
      WHEN m.home_team_goals > m.away_team_goals THEN 3
      WHEN m.home_team_goals = m.away_team_goals THEN 1
      ELSE 0
    END
  ) AS totalPoints,
  COUNT(*) AS totalGames,
  SUM(
    CASE
      WHEN m.home_team_goals > m.away_team_goals THEN 1
      ELSE 0
    END
  ) AS totalVictories,
  SUM(
    CASE
      WHEN m.home_team_goals = m.away_team_goals THEN 1
      ELSE 0
    END
  ) AS totalDraws,
  SUM(
    CASE
      WHEN m.home_team_goals < m.away_team_goals THEN 1
      ELSE 0
    END
  ) AS totalLosses,
  SUM(m.home_team_goals) AS goalsFavor,
  SUM(m.away_team_goals) AS goalsOwn,
  SUM(m.home_team_goals) - SUM(m.away_team_goals) AS goalsBalance,
  ROUND(
    (
      SUM(
        CASE
          WHEN m.home_team_goals > m.away_team_goals THEN 3
          WHEN m.home_team_goals = m.away_team_goals THEN 1
          ELSE 0
        END
      ) / (COUNT(*) * 3)
    ) * 100,
    2
  ) AS efficiency
FROM
  TRYBE_FUTEBOL_CLUBE.matches as m
  INNER JOIN TRYBE_FUTEBOL_CLUBE.teams as t ON m.home_team_id = t.id
WHERE
  m.in_progress = false
GROUP BY
  team_name
ORDER BY
  totalPoints DESC,
  totalVictories DESC,
  goalsBalance DESC,
  goalsFavor DESC;
`;

const test = '';

export { homeTeamLeaderBoardQuery, test };