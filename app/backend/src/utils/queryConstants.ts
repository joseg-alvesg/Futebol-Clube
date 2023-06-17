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
const awayTeamLeaderBoardQuery = `
SELECT
  t.team_name AS name,
  SUM(
    CASE
      WHEN m.home_team_goals < m.away_team_goals THEN 3
      WHEN m.home_team_goals = m.away_team_goals THEN 1
      ELSE 0
    END
  ) AS totalPoints,
  COUNT(*) AS totalGames,
  SUM(
    CASE
      WHEN m.home_team_goals < m.away_team_goals THEN 1
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
      WHEN m.home_team_goals > m.away_team_goals THEN 1
      ELSE 0
    END
  ) AS totalLosses,
  SUM(m.away_team_goals) AS goalsFavor,
  SUM(m.home_team_goals) AS goalsOwn,
  SUM(m.away_team_goals) - SUM(m.home_team_goals) AS goalsBalance,
  ROUND(
    (
      SUM(
        CASE
          WHEN m.home_team_goals < m.away_team_goals THEN 3
          WHEN m.home_team_goals = m.away_team_goals THEN 1
          ELSE 0
        END
      ) / (COUNT(*) * 3)
    ) * 100,
    2
  ) AS efficiency
FROM
  TRYBE_FUTEBOL_CLUBE.matches AS m
  INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS t ON m.away_team_id = t.id
WHERE
  m.in_progress = false
GROUP BY
  t.team_name
ORDER BY
  totalPoints DESC,
  totalVictories DESC,
  goalsBalance DESC,
  goalsFavor DESC;
`;

const leaderBoardQuery = `
SELECT name,
  SUM(totalPoints) AS totalPoints,
  SUM(totalGames) AS totalGames,
  SUM(totalVictories) AS totalVictories,
  SUM(totalDraws) AS totalDraws,
  SUM(totalLosses) AS totalLosses,
  SUM(goalsFavor) AS goalsFavor,
  SUM(goalsOwn) AS goalsOwn,
  SUM(goalsBalance) AS goalsBalance,
  ROUND((SUM(totalPoints) / (SUM(totalGames) * 3.0)) * 100, 2) AS efficiency
FROM (
  SELECT
    t.team_name AS name,
    SUM(
      CASE
        WHEN m.home_team_goals < m.away_team_goals THEN 3
        WHEN m.home_team_goals = m.away_team_goals THEN 1
        ELSE 0
      END
    ) AS totalPoints,
    COUNT(*) AS totalGames,
    SUM(
      CASE
        WHEN m.home_team_goals < m.away_team_goals THEN 1
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
        WHEN m.home_team_goals > m.away_team_goals THEN 1
        ELSE 0
      END
    ) AS totalLosses,
    SUM(m.away_team_goals) AS goalsFavor,
    SUM(m.home_team_goals) AS goalsOwn,
    SUM(m.away_team_goals) - SUM(m.home_team_goals) AS goalsBalance
  FROM
    TRYBE_FUTEBOL_CLUBE.matches AS m
    INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS t ON m.away_team_id = t.id
  WHERE
    m.in_progress = 0
  GROUP BY
    t.team_name

  UNION

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
    SUM(m.home_team_goals) - SUM(m.away_team_goals) AS goalsBalance
  FROM
    TRYBE_FUTEBOL_CLUBE.matches AS m
    INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS t ON m.home_team_id = t.id
  WHERE
    m.in_progress = 0
  GROUP BY
    t.team_name
) AS subquery
GROUP BY name
ORDER BY
  totalPoints DESC,
  totalVictories DESC,
  goalsBalance DESC,
  goalsFavor DESC;
`;

export { homeTeamLeaderBoardQuery, awayTeamLeaderBoardQuery, leaderBoardQuery };
