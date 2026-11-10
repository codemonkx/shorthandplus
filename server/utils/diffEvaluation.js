/**
 * Server-Side Examination Evaluation Engine
 * Uses Longest Common Subsequence (LCS) & Levenshtein distance for word-level alignment
 * strictly calibrated for SSC Stenographer, High Court, and Civil Court standards.
 */

function cleanWord(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?"'–—]/g, '').trim();
}

function levenshteinDistance(s1, s2) {
  const m = s1.length;
  const n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}

export function evaluateTranscription(masterText = '', userText = '', timeTakenSecs = 300) {
  const masterWords = (masterText || '').trim().split(/\s+/).filter(Boolean);
  const userWords = (userText || '').trim().split(/\s+/).filter(Boolean);

  const m = masterWords.length;
  const n = userWords.length;

  // dp[i][j] stores length of LCS of masterWords[0..i-1] and userWords[0..j-1]
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    const mwClean = cleanWord(masterWords[i - 1]);
    for (let j = 1; j <= n; j++) {
      const uwClean = cleanWord(userWords[j - 1]);
      if (mwClean === uwClean) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to reconstruct aligned tokens
  let i = m;
  let j = n;
  const aligned = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && cleanWord(masterWords[i - 1]) === cleanWord(userWords[j - 1])) {
      aligned.push({
        type: 'correct',
        master: masterWords[i - 1],
        user: userWords[j - 1]
      });
      i--;
      j--;
    } else if (i > 0 && j > 0 && (dp[i][j] === dp[i - 1][j - 1])) {
      const dist = levenshteinDistance(cleanWord(masterWords[i - 1]), cleanWord(userWords[j - 1]));
      const isClose = dist <= Math.max(2, Math.floor(masterWords[i - 1].length * 0.4));
      
      if (isClose) {
        aligned.push({
          type: 'wrong',
          master: masterWords[i - 1],
          user: userWords[j - 1]
        });
        i--;
        j--;
      } else if (dp[i - 1][j] >= dp[i][j - 1]) {
        aligned.push({
          type: 'missing',
          master: masterWords[i - 1],
          user: ''
        });
        i--;
      } else {
        aligned.push({
          type: 'extra',
          master: '',
          user: userWords[j - 1]
        });
        j--;
      }
    } else if (i > 0 && (j === 0 || dp[i - 1][j] >= dp[i][j - 1])) {
      aligned.push({
        type: 'missing',
        master: masterWords[i - 1],
        user: ''
      });
      i--;
    } else if (j > 0) {
      aligned.push({
        type: 'extra',
        master: '',
        user: userWords[j - 1]
      });
      j--;
    }
  }

  aligned.reverse();

  let correctCount = 0;
  let fullMistakes = 0; // substitutions (incorrect words)
  let missingCount = 0; // omissions (missing words)
  let extraCount = 0;   // additions (extra words)

  const incorrectWords = [];
  const missingWords = [];
  const additionalWords = [];

  aligned.forEach((token, idx) => {
    token.index = idx;
    if (token.type === 'correct') {
      correctCount++;
    } else if (token.type === 'wrong') {
      fullMistakes++;
      incorrectWords.push({ master: token.master, typed: token.user });
    } else if (token.type === 'missing') {
      missingCount++;
      missingWords.push(token.master);
    } else if (token.type === 'extra') {
      extraCount++;
      additionalWords.push(token.user);
    }
  });

  const totalMasterWords = Math.max(1, masterWords.length);
  const totalTypedWords = userWords.length;

  const effectiveErrors = fullMistakes + missingCount + extraCount;
  const errorPercentage = Math.min(100, Math.round((effectiveErrors / totalMasterWords) * 1000) / 10);
  const accuracyPct = Math.max(0, Math.round((100 - errorPercentage) * 10) / 10);

  const timeMinutes = Math.max(0.2, (timeTakenSecs || 300) / 60);
  const grossWpm = Math.round(totalTypedWords / timeMinutes) || 0;
  const netWpm = Math.max(0, Math.round((totalTypedWords - effectiveErrors) / timeMinutes)) || 0;

  const isQualified = errorPercentage <= 7.0 && netWpm >= 30;
  const qualificationStatus = isQualified ? 'Qualified (Merit Standard)' : 'Disqualified (Errors Exceeded)';

  return {
    grossWpm,
    netWpm,
    speedWpm: netWpm,
    accuracyPct,
    errorPercentage,
    totalMasterWords,
    totalWords: totalMasterWords,
    totalTypedWords,
    typedWords: totalTypedWords,
    correctCount,
    fullMistakes,
    missingCount,
    extraCount,
    effectiveErrors,
    halfMistakes: 0,
    qualificationStatus,
    incorrectWords,
    missingWords,
    additionalWords,
    alignedTokens: aligned
  };
}

