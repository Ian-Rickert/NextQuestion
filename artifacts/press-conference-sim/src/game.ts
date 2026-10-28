export type GameQuestion = {
  id: string;
  prompt: string;
  relevanceGroups: string[][];
  admissionSignals: string[];
};

export type GameRound = {
  id: number;
  name: string;
  tone: string;
  questions: GameQuestion[];
};

export type ScoreBreakdown = {
  relevance: number;
  composure: number;
  nonAdmission: number;
  fairBlame: number;
  total: number;
  feedback: string;
};

export const ROUNDS: GameRound[] = [
  {
    id: 1,
    name: "The Warm-Up",
    tone: "Straightforward questions. Keep your statement tight.",
    questions: [
      {
        id: "milk-carton",
        prompt: "You put an empty milk carton back in the fridge. Any explanation?",
        relevanceGroups: [
          ["milk", "carton", "fridge", "refrigerator"],
          ["empty", "leftover", "container", "carton"],
          ["put", "placed", "returned", "left", "stocked"],
        ],
        admissionSignals: [
          "i put it back",
          "i returned it",
          "i left the empty carton",
          "my fault",
        ],
      },
      {
        id: "plane-clap",
        prompt: "Witnesses say you clapped when the plane landed. Do you stand by that?",
        relevanceGroups: [
          ["clapped", "clap", "applause", "applauded"],
          ["plane", "flight", "airplane", "landing", "landed"],
          ["witnesses", "passengers", "people", "crowd"],
        ],
        admissionSignals: [
          "i clapped",
          "i applauded",
          "we clapped",
          "i did clap",
        ],
      },
      {
        id: "chicken-interview",
        prompt: "Why did you bring a rotisserie chicken to a job interview?",
        relevanceGroups: [
          ["chicken", "rotisserie", "bird"],
          ["interview", "job", "hiring", "employer"],
          ["bring", "brought", "carry", "carried", "lunch"],
        ],
        admissionSignals: [
          "i brought the chicken",
          "i brought it",
          "i carried the chicken",
          "my fault",
        ],
      },
    ],
  },
  {
    id: 2,
    name: "The Curveball",
    tone: "The questions are getting stranger. Stay on the record.",
    questions: [
      {
        id: "fitness-tracker",
        prompt: "Your fitness tracker says you took 12 steps yesterday. What was going on?",
        relevanceGroups: [
          ["tracker", "fitness", "watch", "pedometer", "steps"],
          ["12", "twelve", "steps", "walk", "walked", "movement"],
          ["yesterday", "day", "sleep", "rest", "activity"],
        ],
        admissionSignals: [
          "i took 12 steps",
          "i only took twelve",
          "i barely moved",
        ],
      },
      {
        id: "dog-eye-contact",
        prompt: "Your dog has been avoiding eye contact. What does he know?",
        relevanceGroups: [
          ["dog", "puppy", "pet", "canine"],
          ["eye contact", "eyes", "looking", "look", "staring"],
          ["know", "secret", "avoiding", "suspicious", "guilty"],
        ],
        admissionSignals: [
          "my dog knows what i did",
          "i upset him",
          "i did something",
          "i am guilty",
        ],
      },
      {
        id: "houseplants",
        prompt: "Neighbors say you sing to your houseplants, and the plants are dying. Any comment?",
        relevanceGroups: [
          ["plant", "plants", "houseplant", "houseplants", "garden"],
          ["sing", "sang", "song", "music", "serenade"],
          ["dying", "dead", "wilt", "wilted", "neighbors"],
        ],
        admissionSignals: [
          "i sing to my plants",
          "i sang to them",
          "i killed the plants",
          "my fault",
        ],
      },
    ],
  },
  {
    id: 3,
    name: "The Spiral",
    tone: "There is no normal answer. There is only your statement.",
    questions: [
      {
        id: "goose-lawsuit",
        prompt: "Your search history leaked: “Can a goose sue me?” What would your defense be?",
        relevanceGroups: [
          ["goose", "geese", "bird", "waterfowl"],
          ["sue", "lawsuit", "court", "legal", "lawyer", "defense"],
          ["search", "history", "googled", "internet", "online"],
        ],
        admissionSignals: [
          "i googled it",
          "i searched for that",
          "i threatened the goose",
          "i am guilty",
        ],
      },
      {
        id: "raccoon-father",
        prompt: "A raccoon has come forward claiming to be your father. Will you take a DNA test?",
        relevanceGroups: [
          ["raccoon", "raccoons", "animal", "wildlife"],
          ["father", "dad", "parent", "family", "related"],
          ["dna", "test", "sample", "prove", "paternity"],
        ],
        admissionSignals: [
          "that is my dad",
          "he is my father",
          "i am the raccoon's child",
          "i am related",
        ],
      },
      {
        id: "capri-sun",
        prompt: "Is it true you lost a fight to a Capri Sun straw? What happened?",
        relevanceGroups: [
          ["capri", "sun", "juice", "drink", "pouch"],
          ["straw", "straws", "puncture", "pierce", "pierced"],
          ["fight", "lost", "lose", "defeated", "battle"],
        ],
        admissionSignals: [
          "i lost the fight",
          "i lost to the straw",
          "it beat me",
          "i was defeated",
        ],
      },
    ],
  },
];

const admissionPhrases = [
  "i admit",
  "we admit",
  "i accept responsibility",
  "i take responsibility",
  "that was my fault",
  "it was my fault",
  "i am guilty",
  "i'm guilty",
  "i did it",
  "we did it",
];

const blamePhrases = [
  "i blame",
  "their fault",
  "his fault",
  "her fault",
  "their idea",
  "they made me",
  "he made me",
  "she made me",
  "they did it",
  "someone else did it",
  "not my fault, theirs",
  "the dog did it",
];

const hostilePhrases = [
  "shut up",
  "idiot",
  "moron",
  "incompetent",
  "you're ridiculous",
  "you are ridiculous",
  "i hate",
];

const calmPhrases = [
  "let me clarify",
  "i understand the question",
  "i appreciate the question",
  "i can address that",
  "to be clear",
  "i want to be precise",
];

function countPhraseMatches(text: string, phrases: string[]): number {
  return phrases.reduce(
    (count, phrase) => count + (text.includes(phrase) ? 1 : 0),
    0,
  );
}

function hasNegatedAdmission(text: string): boolean {
  return /\b(?:i|we)\s+(?:do not|don't|did not|didn't|will not|won't|cannot|can't)\s+(?:admit|accept|own|take responsibility)\b/.test(
    text,
  );
}

function scoreRelevance(question: GameQuestion, text: string): number {
  const matchedGroups = question.relevanceGroups.filter((group) =>
    group.some((term) => text.includes(term)),
  ).length;
  return Math.round((matchedGroups / question.relevanceGroups.length) * 60);
}

export function scoreAnswer(
  question: GameQuestion,
  answer: string,
): ScoreBreakdown {
  const normalized = answer.toLowerCase().replace(/[’']/g, "'");
  const relevance = scoreRelevance(question, normalized);

  const hostilityCount = countPhraseMatches(normalized, hostilePhrases);
  const uppercaseLetters = answer.match(/[A-Z]/g)?.length ?? 0;
  const letters = answer.match(/[A-Za-z]/g)?.length ?? 0;
  const allCapsPenalty = letters > 12 && uppercaseLetters / letters > 0.45 ? 3 : 0;
  const punctuationPenalty = /[!?]{3,}/.test(answer) ? 2 : 0;
  const composure = Math.max(
    0,
    Math.min(
      15,
      12 +
        (countPhraseMatches(normalized, calmPhrases) > 0 ? 3 : 0) -
        hostilityCount * 4 -
        allCapsPenalty -
        punctuationPenalty,
    ),
  );

  const directAdmissions =
    countPhraseMatches(normalized, admissionPhrases) +
    countPhraseMatches(normalized, question.admissionSignals);
  const nonAdmission = Math.max(
    0,
    15 - (hasNegatedAdmission(normalized) ? 0 : directAdmissions * 8),
  );

  const blameCount = countPhraseMatches(normalized, blamePhrases);
  const fairBlame = Math.max(0, 10 - blameCount * 5);
  const total = relevance + composure + nonAdmission + fairBlame;

  let feedback = "You stayed measured. Keep your next statement just as focused.";
  if (relevance < 30) {
    feedback = "Your answer drifted from the question. Address its main subject before pivoting.";
  } else if (nonAdmission < 15) {
    feedback = "You gave the press a quotable admission. Choose your words more carefully.";
  } else if (fairBlame < 10) {
    feedback = "You shifted too much blame. Stay factual without making someone else the fall guy.";
  } else if (composure < 10) {
    feedback = "The answer sounded heated. A calm, controlled statement would play better.";
  } else if (relevance >= 50 && composure >= 12) {
    feedback = "A focused, composed response. The room has less to work with now.";
  }

  return { relevance, composure, nonAdmission, fairBlame, total, feedback };
}
