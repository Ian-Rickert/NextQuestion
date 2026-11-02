export type RelevanceCue = {
  terms: string[];
  points: number;
};

export type GameQuestion = {
  id: string;
  prompt: string;
  relevanceGroups: RelevanceCue[];
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
          {
            terms: ["milk", "dairy", "carton", "fridge", "refrigerator", "container"],
            points: 15,
          },
          {
            terms: ["empty", "returned", "return", "put it back", "left it", "tossed it", "threw it away", "stocked", "replaced", "refill"],
            points: 10,
          },
          {
            terms: ["asleep", "sleep", "slept", "hours", "three hours", "tired", "exhausted", "half awake", "groggy", "distracted", "mistake", "mixed up", "forgot", "rushed", "in a hurry", "habit", "accident", "automatic", "autopilot", "multitasking"],
            points: 35,
          },
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
          {
            terms: ["clap", "clapped", "applause", "applauded", "cheering", "cheered"],
            points: 20,
          },
          {
            terms: ["plane", "flight", "airplane", "aircraft", "pilot", "landed", "landing", "airport"],
            points: 15,
          },
          {
            terms: ["father", "dad", "mother", "parent", "family", "last flight", "final flight", "last trip", "farewell", "tribute", "proud", "emotional", "milestone", "homecoming"],
            points: 25,
          },
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
          {
            terms: ["chicken", "rotisserie", "bird", "food", "dinner", "lunch", "meal"],
            points: 15,
          },
          {
            terms: ["interview", "hiring", "hired", "job", "employer", "recruiter", "trader joe", "trader joes", "joe's", "joes", "store", "grocery"],
            points: 15,
          },
          {
            terms: ["bring", "brought", "carry", "carried", "took", "take", "taking", "carry in", "took in"],
            points: 12,
          },
          {
            terms: ["hungry", "appetite", "inventory", "comedic", "timing", "funny", "joke", "humor", "props", "demonstrate", "showed", "strategy", "prepared", "role", "fit", "sample"],
            points: 18,
          },
        ],
        admissionSignals: [
          "i brought the chicken",
          "i brought it",
          "i carried the chicken",
          "taking a rotisserie chicken to the interview",
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
          {
            terms: ["fitness tracker", "tracker", "watch", "pedometer", "wearable", "device", "app"],
            points: 12,
          },
          {
            terms: ["12", "twelve", "steps", "step", "walking", "walk", "movement", "activity"],
            points: 12,
          },
          {
            terms: ["broken leg", "injured", "injury", "crutches", "unable to walk", "cannot walk", "can't walk", "ankle", "cast", "recovery", "recovering", "mobility", "sick", "illness", "bed rest", "wheelchair", "surgery", "physical therapy", "pain", "sprained", "sprain", "leg"],
            points: 30,
          },
          {
            terms: ["because", "since", "due to", "after", "have", "unable", "doctor", "doctor's orders", "temporary"],
            points: 6,
          },
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
          {
            terms: ["dog", "puppy", "pet", "canine"],
            points: 18,
          },
          {
            terms: ["eye contact", "eyes", "looking", "look", "stare", "staring", "avoiding"],
            points: 14,
          },
          {
            terms: ["know", "secret", "suspicious", "behavior", "something", "guilty", "saw", "noticed"],
            points: 15,
          },
          {
            terms: ["treat", "food", "walk", "park", "noise", "vacuum", "vet", "bath", "squirrel", "chewing", "barked"],
            points: 13,
          },
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
          {
            terms: ["plant", "plants", "houseplant", "houseplants", "garden", "flowers"],
            points: 18,
          },
          {
            terms: ["sing", "sang", "song", "music", "serenade", "hum", "hummed"],
            points: 14,
          },
          {
            terms: ["dying", "dead", "wilting", "wilt", "wilted", "brown", "drooping"],
            points: 12,
          },
          {
            terms: ["water", "sunlight", "soil", "pot", "overwater", "neglect", "voice", "nerves", "playlist"],
            points: 16,
          },
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
          {
            terms: ["goose", "geese", "bird", "waterfowl"],
            points: 15,
          },
          {
            terms: ["sue", "lawsuit", "court", "legal", "lawyer", "defense", "attorney", "rights"],
            points: 20,
          },
          {
            terms: ["search", "history", "googled", "internet", "online", "browser"],
            points: 15,
          },
          {
            terms: ["bite", "chase", "chased", "honk", "attacked", "incident", "argument", "encounter", "feud"],
            points: 10,
          },
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
          {
            terms: ["raccoon", "raccoons", "animal", "wildlife"],
            points: 15,
          },
          {
            terms: ["father", "dad", "parent", "family", "related"],
            points: 18,
          },
          {
            terms: ["dna", "test", "sample", "prove", "paternity"],
            points: 18,
          },
          {
            terms: ["lab", "results", "proof", "ancestry"],
            points: 9,
          },
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
          {
            terms: ["capri", "sun", "capri sun", "juice", "juice pouch", "pouch", "drink"],
            points: 15,
          },
          {
            terms: ["straw", "straws", "puncture", "pierce", "pierced"],
            points: 18,
          },
          {
            terms: ["fight", "lost", "lose", "defeated", "battle"],
            points: 17,
          },
          {
            terms: ["plastic", "seal", "hole", "spill", "opening", "piercing", "wrestling"],
            points: 10,
          },
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

function questionVariant(
  id: string,
  prompt: string,
  subjectTerms: string[],
  detailTerms: string[],
  explanationTerms: string[],
  admissionSignals: string[] = [],
): GameQuestion {
  return {
    id,
    prompt,
    relevanceGroups: [
      { terms: subjectTerms, points: 20 },
      { terms: detailTerms, points: 15 },
      { terms: explanationTerms, points: 25 },
    ],
    admissionSignals,
  };
}

const QUESTION_VARIANTS: Record<string, GameQuestion[]> = {
  "milk-carton": [
    questionVariant(
      "empty-cereal-box",
      "You put an empty cereal box back in the pantry. Were you expecting it to refill itself?",
      ["cereal", "box", "cereal box", "pantry"],
      ["empty", "put it back", "returned", "stored"],
      ["thought it was full", "tired", "asleep", "distracted", "forgot", "automatic", "rushed"],
      ["i put the empty box back", "i returned the box"],
    ),
    questionVariant(
      "dirty-mug-cupboard",
      "A dirty mug turned up in the clean cupboard. How did it get there?",
      ["mug", "cup", "coffee cup"],
      ["cupboard", "cabinet", "clean dishes", "dirty"],
      ["mistake", "rushed", "tired", "washing", "thought it was clean", "forgot"],
      ["i put the dirty mug away", "i put it in the cupboard"],
    ),
    questionVariant(
      "lonely-laundry-sock",
      "A single sock has been in the washing machine for three days. Any explanation?",
      ["sock", "socks", "washing machine", "laundry"],
      ["left", "forgot", "three days", "week"],
      ["busy", "forgot", "travel", "away", "distracted", "wash cycle"],
      ["i left the sock", "i forgot the sock"],
    ),
    questionVariant(
      "midnight-cheese",
      "You were caught eating shredded cheese straight from the bag at 3 a.m. What was the plan?",
      ["cheese", "shredded cheese", "bag"],
      ["ate", "eating", "3 a.m.", "late night", "snack"],
      ["hungry", "late", "couldn't sleep", "tired", "craving", "mistake"],
      ["i ate the cheese", "i was eating cheese"],
    ),
  ],
  "plane-clap": [
    questionVariant(
      "movie-credits-applause",
      "Witnesses say you clapped when the movie credits started. Who were you applauding?",
      ["movie", "theater", "cinema", "credits"],
      ["clap", "clapped", "applause", "applauded"],
      ["actor", "director", "cast", "loved it", "reflex", "forgot", "embarrassed"],
      ["i clapped at the credits", "i applauded the movie"],
    ),
    questionVariant(
      "wrong-person-wave",
      "You waved back at someone who was waving to the person behind you. What happened?",
      ["wave", "waved", "waving", "person"],
      ["behind me", "stranger", "wrong person", "turned around"],
      ["mistake", "thought", "distracted", "being polite", "confused"],
      ["i waved back", "i waved at them"],
    ),
    questionVariant(
      "called-teacher-mom",
      "You called your teacher “Mom” in class. Would you like to explain?",
      ["teacher", "mom", "mother"],
      ["class", "school", "called", "said"],
      ["tired", "habit", "mistake", "distracted", "embarrassed", "on autopilot"],
      ["i called my teacher mom", "i said mom"],
    ),
    questionVariant(
      "thanked-automatic-door",
      "You thanked an automatic door after it opened. Was anyone else there?",
      ["door", "automatic door"],
      ["thank", "thanked", "opened", "said thank you"],
      ["polite", "habit", "reflex", "alone", "embarrassed", "on autopilot"],
      ["i thanked the door", "i said thank you to it"],
    ),
  ],
  "chicken-interview": [
    questionVariant(
      "cereal-orange-juice",
      "You were caught eating cereal with orange juice. Any explanation?",
      ["cereal", "orange juice", "juice"],
      ["breakfast", "eating", "mixed", "instead of milk"],
      ["ran out of milk", "experiment", "hungry", "mistake", "tired", "different"],
      ["i ate cereal with orange juice", "i poured juice on cereal"],
    ),
    questionVariant(
      "ketchup-packets-backpack",
      "Security found 14 ketchup packets in your backpack. Why were you carrying them?",
      ["ketchup", "packets", "backpack", "sauce"],
      ["security", "found", "carrying", "pocket"],
      ["lunch", "forgot", "free", "habit", "condiments", "meal"],
      ["i had the ketchup packets", "i put them in my backpack"],
    ),
    questionVariant(
      "lunch-at-interview",
      "You packed a full lunch for a 20-minute job interview. Was that strategic?",
      ["lunch", "food", "meal", "interview", "job"],
      ["packed", "brought", "20 minutes", "short"],
      ["hungry", "long wait", "schedule", "prepared", "snack", "forgot"],
      ["i brought lunch to the interview", "i packed a lunch"],
    ),
    questionVariant(
      "library-book-smell",
      "A librarian says you smelled a book before checking it out. What were you looking for?",
      ["book", "library", "librarian"],
      ["smell", "smelled", "sniff", "sniffed", "checking it out"],
      ["old paper", "curious", "musty", "scent", "habit", "embarrassed"],
      ["i smelled the book", "i sniffed it"],
    ),
  ],
  "fitness-tracker": [
    questionVariant(
      "gps-same-block",
      "Your GPS sent you around the same block four times. Were you lost or committed?",
      ["gps", "map", "route", "directions"],
      ["same block", "four times", "rerouted", "around"],
      ["lost", "bakery", "coffee", "shortcut", "distracted", "wrong turn"],
      ["i drove around the block", "i followed the route"],
    ),
    questionVariant(
      "snoozed-alarm",
      "Your alarm was snoozed 11 times, but you say you were awake. What happened?",
      ["alarm", "snooze", "snoozed"],
      ["11 times", "morning", "awake", "overslept"],
      ["tired", "didn't hear", "dream", "late", "battery", "half asleep"],
      ["i snoozed the alarm", "i turned it off"],
    ),
    questionVariant(
      "headphone-workout",
      "Your fitness app recorded a workout while you were searching for headphones. How?",
      ["fitness app", "workout", "headphones", "app"],
      ["searching", "looking", "recorded", "steps"],
      ["lost", "warmup", "forgot", "activity", "moving around", "miscounted"],
      ["i searched for my headphones", "i was looking for them"],
    ),
    questionVariant(
      "tip-calculator",
      "You used a calculator to work out a 15% tip for 12 minutes. Any reason?",
      ["calculator", "tip", "math", "15%"],
      ["12 minutes", "restaurant", "bill", "worked out"],
      ["careful", "overthinking", "bad at math", "double-check", "nervous", "split"],
      ["i calculated the tip", "i used the calculator"],
    ),
  ],
  "dog-eye-contact": [
    questionVariant(
      "dog-karaoke-exit",
      "Your dog leaves the room whenever you start singing. What is the disagreement?",
      ["dog", "puppy", "pet", "canine"],
      ["singing", "sing", "leaves", "room", "karaoke"],
      ["noise", "treat", "vacuum", "song", "squirrel", "embarrassed"],
      ["my dog leaves when i sing", "i sing too loudly"],
    ),
    questionVariant(
      "cat-book-block",
      "Your cat keeps sitting on the exact page you need. What is it trying to tell you?",
      ["cat", "pet", "book", "page"],
      ["sitting", "sits", "need", "blocking", "keeps"],
      ["attention", "food", "warm", "jealous", "hiding", "laptop"],
      ["my cat sits on the book", "i moved the cat"],
    ),
    questionVariant(
      "speaker-elevator-music",
      "Your smart speaker plays elevator music whenever you try to cook. Do you know why?",
      ["speaker", "smart speaker", "music", "elevator music"],
      ["cook", "cooking", "kitchen", "plays"],
      ["malfunction", "playlist", "routine", "voice command", "accident", "setting"],
      ["i set it to play", "i asked it to play"],
    ),
    questionVariant(
      "dog-fake-accent",
      "Your neighbor says your dog only listens when you use a fake accent. What is going on?",
      ["dog", "puppy", "pet"],
      ["neighbor", "fake accent", "listens", "voice"],
      ["command", "training", "joke", "treat", "habit", "misunderstood"],
      ["i use an accent", "i trained the dog"],
    ),
  ],
  "houseplants": [
    questionVariant(
      "chores-nature-documentary",
      "Neighbors say you narrate your chores like a nature documentary. What are you documenting?",
      ["chores", "documentary", "nature"],
      ["narrate", "narrating", "voice", "neighbors"],
      ["joke", "bored", "alone", "habit", "cleaning", "dramatic"],
      ["i narrate my chores", "i was doing a documentary voice"],
    ),
    questionVariant(
      "printer-pep-talk",
      "Your coworker saw you whispering pep talks to the office printer. What was at stake?",
      ["printer", "office", "coworker"],
      ["pep talk", "whispering", "printing", "paper"],
      ["deadline", "jammed", "nervous", "encouragement", "job", "presentation"],
      ["i talked to the printer", "i gave it a pep talk"],
    ),
    questionVariant(
      "bakery-gps",
      "Your GPS keeps rerouting you to the same bakery. What keeps drawing you back?",
      ["gps", "bakery", "route", "directions"],
      ["rerouting", "same", "keeps", "driving"],
      ["pastry", "bread", "coffee", "habit", "favorite", "wrong setting"],
      ["i keep going to the bakery", "i followed the gps"],
    ),
    questionVariant(
      "two-minute-stretch",
      "Your fitness app called a two-minute stretch your personal best. Is that accurate?",
      ["fitness app", "stretch", "workout", "app"],
      ["two minutes", "personal best", "recorded", "exercise"],
      ["new", "recovery", "warmup", "encouragement", "injury", "starting out"],
      ["i stretched for two minutes", "that was my workout"],
    ),
  ],
  "goose-lawsuit": [
    questionVariant(
      "big-steve-chat",
      "Your group chat leaked. Who is “Big Steve,” and why is he saved as “DO NOT ANSWER”?",
      ["group chat", "chat", "leaked", "message"],
      ["big steve", "saved", "contact", "do not answer"],
      ["nickname", "boss", "number", "spam", "private", "old friend"],
      ["i saved him as", "big steve is"],
    ),
    questionVariant(
      "three-block-goose",
      "A goose chased you for three blocks. Who won, and why was it chasing you?",
      ["goose", "geese", "bird"],
      ["chased", "three blocks", "ran", "who won"],
      ["bread", "food", "nest", "territory", "feathers", "wrong turn"],
      ["i ran from the goose", "the goose chased me"],
    ),
    questionVariant(
      "microwave-burrito-run",
      "Your gym teacher says you run like a microwave burrito. Is that your official explanation?",
      ["gym teacher", "teacher", "burrito", "microwave"],
      ["run", "running", "race", "gym"],
      ["slow", "awkward", "warmup", "injury", "joke", "style"],
      ["i run like", "my teacher said"],
    ),
    questionVariant(
      "pigeon-photo-collection",
      "Why do you have 400 photos of the same pigeon on your phone?",
      ["pigeon", "bird", "phone", "photos"],
      ["400", "same", "photos", "pictures"],
      ["research", "album", "birdwatching", "fascinated", "joke", "it followed me"],
      ["i took the photos", "i photographed the pigeon"],
    ),
  ],
  "raccoon-father": [
    questionVariant(
      "mall-santa-complaint",
      "A mall Santa filed a complaint about you. What did you ask for?",
      ["santa", "mall", "christmas"],
      ["complaint", "asked", "request", "wish"],
      ["present", "gift", "list", "mistake", "long line", "joke"],
      ["i asked santa", "i made a request"],
    ),
    questionVariant(
      "pigeon-photo-royalties",
      "The pigeon in your 400 photos is demanding royalties. What are the terms?",
      ["pigeon", "bird", "photos", "pictures"],
      ["royalties", "400", "phone", "demanding"],
      ["payment", "seeds", "contract", "rights", "joke", "copyright"],
      ["i took its photos", "i owe the pigeon"],
    ),
    questionVariant(
      "plants-new-caretaker",
      "Your houseplants sent a group email asking for a new caretaker. What did you do?",
      ["houseplants", "plants", "email", "caretaker"],
      ["group", "sent", "new", "asked"],
      ["water", "sunlight", "forgot", "neglect", "vacation", "plant food"],
      ["i neglected the plants", "i forgot to water them"],
    ),
    questionVariant(
      "raccoon-invoices",
      "A raccoon has been leaving tiny invoices on your porch. What services does it claim to provide?",
      ["raccoon", "animal", "wildlife", "porch"],
      ["invoice", "invoices", "services", "leaving"],
      ["trash", "security", "snacks", "payment", "business", "joke"],
      ["i hired the raccoon", "it works for me"],
    ),
  ],
  "capri-sun": [
    questionVariant(
      "one-star-uber",
      "Your Uber driver gave you one star. What did you do in that car?",
      ["uber", "driver", "car", "ride"],
      ["one star", "rating", "trip", "passenger"],
      ["music", "directions", "conversation", "mess", "late", "mistake"],
      ["i got one star", "i upset the driver"],
    ),
    questionVariant(
      "biscuit-can-scream",
      "Your neighbors say you scream every time you open a can of biscuits. Is this true?",
      ["biscuits", "can", "neighbors", "kitchen"],
      ["scream", "open", "every time", "noise"],
      ["surprised", "pop", "loud", "habit", "joke", "startled"],
      ["i scream when i open it", "i opened the can"],
    ),
    questionVariant(
      "vending-machine-negotiation",
      "You apologized to a vending machine after it rejected your dollar. What did you say?",
      ["vending machine", "machine", "dollar", "money"],
      ["rejected", "apologized", "sorry", "payment"],
      ["stuck", "coin", "snack", "refund", "joke", "polite"],
      ["i apologized to it", "i put money in"],
    ),
    questionVariant(
      "parking-meter-duel",
      "A parking meter challenged you to a duel over 25 cents. How did it end?",
      ["parking meter", "meter", "25 cents", "quarter"],
      ["duel", "challenged", "parking", "ended"],
      ["coin", "expired", "ticket", "argument", "time limit", "joke"],
      ["i fought the meter", "i lost the duel"],
    ),
  ],
};

export const QUESTION_OPTIONS: GameQuestion[][][] = ROUNDS.map((round) =>
  round.questions.map((question) => [
    question,
    ...(QUESTION_VARIANTS[question.id] ?? []),
  ]),
);

export function createQuestionRun(previousRun?: GameRound[]): GameRound[] {
  return ROUNDS.map((round, roundIndex) => ({
    ...round,
    questions: round.questions.map((_, questionIndex) => {
      const options = QUESTION_OPTIONS[roundIndex][questionIndex];
      const previousId =
        previousRun?.[roundIndex]?.questions[questionIndex]?.id;
      const choices =
        previousId && options.length > 1
          ? options.filter((option) => option.id !== previousId)
          : options;
      return choices[Math.floor(Math.random() * choices.length)];
    }),
  }));
}

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

const ENGLISH_FUNCTION_WORDS = new Set(
  `a about above after again against all am an and any are as at away be because been before being below between both but by can cannot could did do does doing done down during each either enough even ever every few for from further get give go had has have he her here hers him his how i if in into is it its just know last let like little long look made make many may me might more most much must my near never no nor not now of off on once one only or other our out over own people place please point quite rather right said same say see she should so some still such take than that the their them then there these they thing think this those through time to today too under until up us use very was we well were what when where which while who why will with would yes yet you your`.split(/\s+/),
);

export const COMMON_ENGLISH_WORDS = new Set(
  `able about above accept according account across act action actually add after again against age ago agree air all almost along already also although always am an and animal another answer any anyone anything anyway appear are around as ask at away back bad bag ball be bear beat because become bed been before began begin behind believe best better between big bird bit black blood blue body book both box boy break broken bring brought brother build business busy but buy by call came can cannot car care carry case cat cause change chicken child children choose city class clean clear close cold come common company continue control cook cool could country course court cover create cry cut day dead decide deep defend defense degree desk did difference different do doctor dog done door down draw dream dress drink drive during each early earth easy eat effect effort end enough enjoy enter especially even ever every example explain eye face fact fall family far fast father feel few field find fine finish first five follow food foot for form found four free friend from front full funny game garden gave general get girl give glass go good government great green ground group grow guess guy had half hand happen hard has have he head health hear heart heavy help her here high him his history hit hold home house how however hundred hungry husband i idea if important in improve in individual information inside instead into inventory involve is it its jacket job join just keep key kid kind king kitchen knew know land large last late laugh law lead learn least leave leg legal less let level life light like likely line list listen little live long look lose lost lot love low made make main major make man many map mark market matter may meal mean meaning meet member memory men mention middle might milk mind minute miss money month more morning most mother mountain mouth move much music must my name near need never new news next night no noise none nor north not note number of off offer office often oil old on once one only open or order other our out over own page paper parent part party pass past pay people percent person picture piece place plan plant play point police poor popular position possible power problem process produce product project provide pull put quality question quick quiet quite radio raise reach read ready real really reason receive recognize record red relate relationship remain remember report respect rest result return right road room round rule run sad safe same saw say school science sea season second see seem sell send sentence serious serve set several she shop short should show showed side simple since sing single sister sit situation six size sleep slow small so society soldier some someone something sometimes sound south space speak special spring stand state stay step still stock stop story strange street strong student study subject such sum sun system take talk teacher team tell ten than thank that the their them then there these they thing think third this those though thought thousand three through throw time tired to today together told too took town trade trader traffic train travel tree true try turn two type under understand until up upon us use used useful usual value very voice wait walk wall want war warm was watch water way we wear week well went were what when where which while white who whole why wide wife will win wind window wish with within without woman women word work world would write wrong year yes yet you you’re your yours youth`,
);

const PROJECT_ENGLISH_WORDS = new Set(
  `asleep hours pilot father flight trader joes joe's rotisserie chicken comedic timing inventory hungry interview taking broken leg unable crutches crutch tracker steps fitness injury injured doctor recovery recovering mobility sick illness wheelchair surgery pain sprain sprained ankle cast physical therapy pedometer wearable landing landed applause applauded clap clapped airplane aircraft airport farewell tribute emotional milestone groggy distracted autopilot multitasking comment comments statement decline discuss speculate pending confidential press don't can't won't didn't doesn't isn't wasn't aren't shouldn't wouldn't couldn't i'm we're they're i've we've that's it's`.split(
    /\s+/,
  ),
);

const QUESTION_ENGLISH_WORDS = new Set(
  `cereal pantry mug cupboard cabinet dishes sock socks washing machine laundry shredded cheese midnight movie theater cinema credits cast director waving stranger behind classroom mom automatic door karaoke cat page smart speaker elevator kitchen gps map route directions alarm snooze workout headphones calculator tip restaurant bill percent orange juice ketchup packets backpack sauce lunch library librarian sniffed smell book checked checking out gps rerouting bakery pastry coworker printer pep talk document documentary narrate chores app stretch warmup group chat leaked steve big saved contact goose geese blocks pigeon photos phone microwave burrito gym mall santa christmas complaint request royalties caretaker raccoon invoices invoice porch services uber driver passenger rating star biscuits neighbors scream vending rejected apologized dollar payment parking meter quarter duel expired ticket coin snack refund territory bread nest feathers nickname spam contact school form guardian willow`.split(
    /\s+/,
  ),
);

const ENGLISH_SUFFIXES = [
  "ies",
  "ing",
  "ed",
  "es",
  "s",
  "er",
  "ers",
  "ly",
  "ness",
  "ment",
  "able",
  "ful",
  "less",
];

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[^a-z0-9']+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsPhrase(text: string, phrase: string): boolean {
  const normalizedPhrase = normalizeText(phrase);
  return ` ${text} `.includes(` ${normalizedPhrase} `);
}

export function isKnownEnglishWord(word: string): boolean {
  if (
    COMMON_ENGLISH_WORDS.has(word) ||
    PROJECT_ENGLISH_WORDS.has(word) ||
    QUESTION_ENGLISH_WORDS.has(word) ||
    ENGLISH_FUNCTION_WORDS.has(word)
  ) {
    return true;
  }

  for (const suffix of ENGLISH_SUFFIXES) {
    if (!word.endsWith(suffix) || word.length <= suffix.length + 2) continue;
    const root = word.slice(0, -suffix.length);
    if (
      COMMON_ENGLISH_WORDS.has(root) ||
      COMMON_ENGLISH_WORDS.has(`${root}e`) ||
      (suffix === "ies" && COMMON_ENGLISH_WORDS.has(`${root}y`))
    ) {
      return true;
    }
  }

  return false;
}

export function isLikelyEnglish(text: string): boolean {
  const words: string[] = text.match(/[a-z]+(?:'[a-z]+)?/g) ?? [];
  if (words.length === 0) return false;

  const recognized = words.filter(isKnownEnglishWord);
  if (words.length === 1) return recognized.length === 1;

  const recognizedRatio = recognized.length / words.length;
  const functionWordCount = words.filter((word) =>
    ENGLISH_FUNCTION_WORDS.has(word),
  ).length;
  const suspiciousWords = words.filter(
    (word) =>
      (word.length >= 7 && !/[aeiouy]/.test(word)) ||
      /[bcdfghjklmnpqrstvwxz]{5,}/.test(word) ||
      /(.)\1{3,}/.test(word),
  ).length;

  return (
    recognizedRatio >= 0.6 &&
    (functionWordCount > 0 || recognizedRatio >= 0.85) &&
    suspiciousWords <= Math.max(1, Math.floor(words.length * 0.1))
  );
}

function countPhraseMatches(text: string, phrases: string[]): number {
  return phrases.reduce(
    (count, phrase) => count + (containsPhrase(text, phrase) ? 1 : 0),
    0,
  );
}

function countAssertedMatches(text: string, phrases: string[]): number {
  return phrases.reduce((count, phrase) => {
    const index = text.indexOf(normalizeText(phrase));
    if (index < 0) return count;

    const precedingWords = text
      .slice(Math.max(0, index - 24), index)
      .trim()
      .split(/\s+/);
    const recentNegation = precedingWords
      .slice(-3)
      .some((word) =>
        ["not", "never", "don't", "didn't", "won't", "can't", "cannot"].includes(
          word,
        ),
      );
    return count + (recentNegation ? 0 : 1);
  }, 0);
}

function scoreRelevance(question: GameQuestion, text: string): number {
  return Math.min(
    60,
    question.relevanceGroups.reduce(
      (score, cue) =>
        score +
        (cue.terms.some((term) => containsPhrase(text, term)) ? cue.points : 0),
      0,
    ),
  );
}

export function scoreAnswer(
  question: GameQuestion,
  answer: string,
): ScoreBreakdown {
  const normalized = normalizeText(answer);
  if (!isLikelyEnglish(normalized)) {
    return {
      relevance: 0,
      composure: 0,
      nonAdmission: 0,
      fairBlame: 0,
      total: 0,
      feedback:
        "No score: this doesn't read as a coherent English answer. Try again with a clear statement.",
    };
  }

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
    countAssertedMatches(normalized, admissionPhrases) +
    countAssertedMatches(normalized, question.admissionSignals);
  const nonAdmission = Math.max(0, 15 - directAdmissions * 8);

  const blameCount = countPhraseMatches(normalized, blamePhrases);
  const fairBlame = Math.max(0, 10 - blameCount * 5);
  const total = relevance + composure + nonAdmission + fairBlame;

  let feedback = "You stayed measured. Keep your next statement just as focused.";
  if (relevance < 20) {
    feedback = "Your answer drifted from the question. Address its main subject before pivoting.";
  } else if (relevance < 40) {
    feedback =
      "You offered related context. Connect it more directly to the reporter's specific detail.";
  } else if (nonAdmission < 15) {
    feedback = "You gave the press a quotable admission. Choose your words more carefully.";
  } else if (fairBlame < 10) {
    feedback = "You shifted too much blame. Stay factual without making someone else the fall guy.";
  } else if (composure < 10) {
    feedback = "The answer sounded heated. A calm, controlled statement would play better.";
  } else if (relevance >= 40 && composure >= 12) {
    feedback =
      "You connected the question to useful context and kept your composure.";
  }

  return { relevance, composure, nonAdmission, fairBlame, total, feedback };
}
