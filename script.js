/* ================= ELEMENTS ================= */
const introScreen = document.getElementById("intro-screen");
let pendingMessage = "";

window.addEventListener("load", () => {
  setTimeout(() => {
    introScreen.classList.add("hidden");
  }, 4000); // intro duration
});

const homeScreen = document.getElementById("home-screen");
const messageScreen = document.getElementById("message-screen");

const moodButtons = document.querySelectorAll(".mood-btn");
const messageText = document.querySelector(".message-text");
const signatureText = document.querySelector(".signature");

const anotherBtn = document.querySelector(".action-btn.primary");
const backBtn = document.querySelector(".action-btn.secondary");

const envelope = document.getElementById("envelope");
const musicBtn = document.getElementById("music-btn");

/* ================= STATE ================= */
let currentMood = null;
let clickCount = 0;
let lastMessageByMood = {};


/* ================= MESSAGE DATA ================= */
/* You can replace these with your full 35+ message sets later */
const messages = {
  happy: [
    "Seeing you happy like this makes my chest feel warm 🥰✨",

    "Your happiness is contagious 😄\nNow I’m smiling at my screen like an idiot thinking of you 🤍",

    "Heyyy happy girl 😆💫\nWhatever made you smile today, thank you… it reached me too 🫶",

    "You glowing like this should be illegal 😌✨\nCareful sya, you’re stealing my heart again 💖",

    "I love this version of you…\nlaughing, smiling, being you 🥰\nPlease don’t stop 💗",

    "If I were there right now, I’d just sit and watch you smile like this 🥹🤍\nNothing else. Just you.",

    "Happy sya energy detected 😤💖\nYes, I’m showing off. You deserve it 😄✨",

    "Your smile has this weird power…\nit makes everything feel lighter ☁️💫\nThank you for existing, rabbit 🐰🤍",

    "I hope you know how beautiful you look when you’re happy 🥰\nLike… unfairly beautiful 💖",

    "Seeing you enjoy the moment makes me so calm 😌🤍\nLike everything is okay as long as you’re smiling",

    "Hey sya 😄\nJust a reminder:\nyour happiness matters to me. A lot. 💗",

    "You smiling right now?\nYeah, I can feel it even from here 😆✨",

    "I wish I could steal this moment and keep it forever 🫶\nHappy you is my favorite you 💖",

    "Don’t rush this happiness, okay? 🥰\nSit in it. Breathe in it.\nYou deserve it 🤍",

    "If happiness had a face, it would look a lot like you right now 😌✨",

    "I love how genuine your happiness feels 🥹\nIt’s soft… warm… real 🤍",

    "This smile of yours?\nYeah, that’s my comfort 😄💗",

    "Rabbit being happy again 🐰✨\nMy heart just did a little jump 🤍",

    "No matter what happens later,\nremember this feeling…\nyou smiling, and me loving it 🫶",

    "You don’t even realize it, but you’re making someone very happy right now 😌💖",

    "Your happiness feels soft, like a warm hug 🫂✨\nI’m so glad you’re feeling this way, sya 🤍",

    "I hope today keeps giving you reasons to smile 😄\nAnd if it doesn’t, I’ll be one of them 💖",

    "Seeing you happy makes me feel safe somehow 🥹🤍\nLike everything is in its right place",

    "Don’t overthink.\nDon’t worry.\nJust be happy right now 🥰✨\nI’m here enjoying it with you",

    "Your laughter must be so cute right now 😆💫\nI wish I could hear it 🫶",

    "Happy moments suit you so well 😌💖\nLike they were made just for you",

    "I hope you know I treasure moments like this 🤍\nYou being happy means more to me than you think",

    "This smile of yours could fix bad days, you know? 🥹✨\nMine included 💗",

    "I’m really glad you’re feeling happy right now 😄\nPlease hold onto it tightly 🤍",

    "If I could pause time, I’d pause it right here 🫶\nYou smiling. Me thinking of you.",

    "You don’t need a reason to be happy…\nbut if you want one, I’m always here 😌💖",

    "Happy sya energy detected ✨😄\nStrongly approved 💗",

    "I love moments where you forget worries and just smile 🥰\nThose moments mean everything to me",

    "Your happiness feels soft and gentle…\nlike you’re finally at ease 🤍\nI love that for you",

    "Keep smiling, okay? 😄💖\nSomeone out here is quietly falling for that smile again and again"
  ],



  sad: [
    "Hey… it’s okay to feel sad right now 😢🤍\nYou don’t need to fix it. You don’t need to explain it.\nJust let it exist for a moment.",

    "I know today feels heavy 🫂\nAnd I’m really sorry you’re carrying this much inside.\nYou don’t deserve this weight.",

    "You’re not weak for feeling this way 🤍\nYou’re human.\nAnd humans are allowed to hurt.",

    "Some days just ache… even when nothing specific is wrong 😞\nIf today is one of those days, I’m right here with you.",

    "You don’t have to pretend to be okay for anyone 😢\nNot here. Not with me.\nYou’re safe to feel.",

    "I wish I could take even a little bit of this sadness away 🫂🤍\nSince I can’t, I’ll stay with you instead.",

    "It’s really hard when your heart feels tired and sore 😞\nPlease be gentle with yourself right now.",

    "Feeling sad doesn’t erase all the good about you 🤍\nYou’re still kind. Still worthy. Still loved.",

    "You’re allowed to slow down today 🐢🤍\nYou don’t have to be productive.\nSurviving is enough.",

    "I know it hurts… maybe more than you’re letting on 😢\nYou don’t have to hide it here.",

    "Sometimes sadness comes without permission 🌧️\nIt doesn’t mean you did anything wrong.",

    "If your heart feels too full and too empty at the same time 😞\nI understand that feeling more than you think.",

    "You don’t need to rush through this emotion 🤍\nTake your time. I’m not going anywhere.",

    "I wish you could see yourself the way I see you right now 🫂\nStill valuable. Still precious. Even while hurting.",

    "It’s okay if today feels harder than yesterday 😢\nHealing isn’t a straight line.",

    "You don’t have to carry this sadness alone 🤍\nEven if it feels lonely right now, you’re not.",

    "If you need to cry, that’s okay 😭\nTears don’t make you weak.\nThey mean you cared.",

    "Some pain doesn’t have words 😞\nIf you don’t know how to explain it, that’s okay.",

    "I know you try to be strong so often 🤍\nYou’re allowed to rest from that today.",

    "It’s okay to miss things… people… versions of yourself 😢\nThat doesn’t make you broken.",

    "Even on sad days, you still matter 🤍\nYour feelings matter.\nYou matter.",

    "You don’t need to be cheerful or positive right now 😞\nJust being honest with how you feel is enough.",

    "I’m really sorry you’re feeling this way 🫂\nIf I could sit beside you quietly, I would.",

    "Sadness can make everything feel distant 🌫️\nBut you’re not invisible. I see you.",

    "You’re allowed to feel disappointed, tired, hurt 😢\nThose emotions don’t make you ungrateful.",

    "Even when you feel low, you are still deserving of love 🤍\nNothing about this feeling changes that.",

    "It’s okay if today is just about getting through 😞\nTomorrow can wait.",

    "You don’t have to force yourself to smile right now 😢\nYour real feelings are more important.",

    "I know this sadness feels quiet but deep 🌊\nPlease remember it won’t last forever.",

    "You’re not a burden for feeling this way 🤍\nYou never were.",

    "Even when your heart feels heavy, it’s still beating 🫂\nAnd that means you’re still here.",

    "Some days just need comfort, not solutions 😞\nToday can be one of those days.",

    "I wish I could wrap you in a long, warm hug right now 🤍\nAnd let you breathe.",

    "It’s okay to admit you’re not okay 😢\nThat honesty takes courage.",

    "This sadness doesn’t define you 🌧️\nIt’s just a moment you’re moving through.",

    "You don’t need to apologize for feeling this way 🤍\nYour emotions are valid."
  ],

  angry: [
    "It makes sense that you’re angry 😠\nSomething crossed a line, and your feelings noticed it.",

    "You’re allowed to be mad 🤍\nAnger doesn’t make you bad.\nIt means something mattered.",

    "Take a breath with me for a second 😤\nNot to calm down—just to give your chest some space.",

    "You don’t have to swallow this anger 😠\nYou’re allowed to feel it without apologizing.",

    "Sometimes anger is just hurt wearing armor 🛡️\nAnd that’s okay.",

    "I know everything feels irritating right now 😤\nEven small things can feel too loud.",

    "You’re not overreacting 🤍\nYour reaction fits the situation you’re in.",

    "It’s exhausting when anger sits in your body like this 😠\nPlease be gentle with yourself.",

    "You don’t need to fix this feeling immediately 🔥\nLet it exist without judging it.",

    "Anger doesn’t cancel your kindness 🤍\nBoth can exist at the same time.",

    "If you feel like snapping at the world right now 😤\nThat’s a sign you need care, not criticism.",

    "You’re allowed to be upset about things that hurt you 😠\nEven if others don’t understand.",

    "This anger feels heavy, I know 🔥\nYou don’t have to carry it perfectly.",

    "You don’t owe anyone calmness right now 🤍\nYour feelings come first.",

    "Sometimes anger is your heart saying “that wasn’t fair” 😠\nAnd it’s okay to listen.",

    "You’re not difficult for feeling this way 🤍\nYou’re reacting to pressure.",

    "If your thoughts feel sharp and loud right now 😤\nThat doesn’t mean you’re a bad person.",

    "You can be angry and still deserving of love 🤍\nNothing about this feeling changes that.",

    "It’s okay if you need distance from people right now 😠\nProtecting your peace matters.",

    "Anger can be a release, not a failure 🔥\nYou’re allowed to let it pass through.",

    "You don’t need to explain your anger perfectly 🤍\nFeeling it is enough.",

    "I know your patience feels thin right now 😤\nThat doesn’t mean you’ve lost control.",

    "You’re allowed to feel frustrated with everything 😠\nSome days just stack too much at once.",

    "If your body feels tense and restless 🔥\nThat’s anger trying to move—let it.",

    "You don’t have to turn this anger inward 🤍\nYou didn’t deserve whatever caused it.",

    "Being angry doesn’t erase your softness 🤍\nIt just means you’re human.",

    "It’s okay if you’re not ready to talk about it yet 😠\nSilence can be part of processing.",

    "You don’t need to be the bigger person right now 🤍\nYou need to be the cared-for one.",

    "Anger doesn’t mean you’ve failed 🌋\nIt means you’re reacting honestly.",

    "If everything feels annoying at once 😤\nThat’s a sign you’re overwhelmed.",

    "You’re not wrong for wanting things to be different 😠\nThat desire matters.",

    "Let this anger breathe instead of trapping it 🤍\nYou don’t have to carry it alone.",

    "You’re allowed to take a break from being patient 🔥\nRest is not weakness.",

    "This feeling won’t last forever 🤍\nEven strong waves eventually settle.",

    "You don’t need to calm down right now 😠\nYou need understanding—and you have it."
  ],


  lonely: [
    "I know this lonely feeling can be really quiet but really heavy 🫂🤍\nEven if nothing is happening around you, something is happening inside.",

    "You don’t feel lonely because you’re unlovable 🤍\nYou feel lonely because you want connection—and that’s human.",

    "If the room feels empty right now 🫂\nPlease know you’re not as alone as it feels.",

    "Loneliness can make time feel slower 🌫️\nI’m right here with you while it passes.",

    "You don’t need to fill the silence with noise 🤍\nSometimes it just needs company.",

    "Even if no one is talking to you right now 🫂\nYou still matter. You always do.",

    "Feeling lonely doesn’t mean you failed at something 🤍\nIt means your heart wants closeness.",

    "I know this kind of loneliness feels different 😞\nLike you’re surrounded, but still alone.",

    "If you’re wishing someone would reach out 🫂\nI wish I could be that presence for you right now.",

    "You don’t have to earn companionship 🤍\nYou deserve it just by being you.",

    "Loneliness can feel like a soft ache that won’t leave 🌙\nI’m sitting with you in it.",

    "Even when no one is physically near 🫂\nYou’re still seen. You’re still important.",

    "You’re not invisible 🤍\nEven on days when it feels like you are.",

    "I know this emptiness can feel uncomfortable 😞\nYou’re allowed to acknowledge it.",

    "You don’t need to push this feeling away 🫂\nLet it rest here for a moment.",

    "Lonely days don’t define your life 🤍\nThey’re just moments passing through.",

    "I wish you didn’t have to feel this alone 😢\nIf I could sit beside you quietly, I would.",

    "You don’t need to entertain anyone right now 🤍\nJust existing is enough.",

    "Even if no one is asking how you are 🫂\nYour feelings still deserve care.",

    "Loneliness doesn’t mean you’re unwanted 🤍\nIt means you’re longing for connection.",

    "If your heart feels like it’s reaching out into empty space 🫂\nI feel that with you.",

    "You don’t need to distract yourself from this feeling 🤍\nYou can let it breathe.",

    "This lonely moment won’t last forever 🌙\nEven if it feels endless right now.",

    "You don’t have to be strong through this 🫂\nIt’s okay to just feel.",

    "Loneliness can make you doubt your worth 🤍\nBut your worth hasn’t changed at all.",

    "If today feels especially quiet 😞\nI’m here keeping you company.",

    "You don’t need to explain why you feel lonely 🤍\nIt doesn’t need justification.",

    "Even in silence, you are not forgotten 🫂\nYou still matter deeply.",

    "I know this feeling can make you curl inward 😞\nPlease be kind to yourself.",

    "You’re allowed to want closeness 🤍\nThat doesn’t make you needy.",

    "If the loneliness feels like a hollow space 🫂\nLet this message sit there gently.",

    "You don’t have to rush out of this feeling 🤍\nTake your time. I’m not leaving.",

    "Loneliness doesn’t erase your importance 🌫️\nYou are still significant.",

    "Even when you feel disconnected 🫂\nYou are still worthy of love.",

    "You don’t have to face this moment by yourself 🤍\nI’m right here with you."
  ]
  ,

  laugh: [
    "Okay listen… if this doesn’t make you laugh, I officially owe you a cookie 🍪😆",

    "Important announcement 🚨\nYou are cute.\nThat’s it. That’s the message 😂",

    "If overthinking burned calories, you’d be extremely fit right now 😭💀",

    "Pause for a second.\nNow imagine a penguin slipping.\nYou’re welcome 🐧😂",

    "I tried to come up with something smart.\nThen I remembered: laughing is better 😆",

    "You look way too serious right now 😐\nPlease smile or I will dramatically fall over 😂",

    "Breaking news 📰\nYou survived today.\nThat alone deserves a laugh 😄",

    "If laughter is medicine, consider this a very small but sincere dose 😂💊",

    "I don’t know what you’re doing right now…\nbut I hope this interrupts it with a smile 😆",

    "Imagine me waving at you like an idiot from across the room 👋😂",

    "Life is confusing.\nYou are doing your best.\nThat’s kinda funny and impressive 😄",

    "If nothing else, at least you found this message 😆\nSmall wins matter",

    "You reading this right now like 😐\nMe hoping you go like 😄",

    "I don’t have a joke.\nI just want you to smile.\nThis is me trying 😂",

    "If laughter doesn’t fix everything, it definitely annoys sadness 😆",

    "Serious reminder:\nYou are not allowed to be sad forever.\nLaugh break now 😂",

    "If today was a mess, at least you’re still cute through it 😭💛",

    "Pretend I just said something really funny.\nNow laugh politely 😄",

    "If you’re smiling even a little right now…\nMission successful 😌✨",

    "Sometimes the joke is just surviving the day 😆\nAnd honestly, that’s enough",

    "I hope this message caught you off-guard and made you snort a little 😂",

    "If laughter had a sound effect, this would be it:\n*boop* 😆",

    "Imagine me tripping over air dramatically 😭\nYeah. That one.",

    "You deserve a laugh break.\nConsider this your permission slip 😄",

    "If this message makes no sense, that’s on purpose 😂",

    "Your smile right now?\nYeah, that’s what I was aiming for 😆",

    "I don’t know what you expected.\nBut I hope this made you grin 😄",

    "If being adorable was a sport, you’d accidentally win 😭💛",

    "This message is just here to say:\nHi. Smile. Please 😆",

    "Laughing at nothing is still laughing 😂\nAnd that counts",

    "If you’re still reading, you’re officially participating in joy 😄",

    "Tiny smile detected? 😌\nGood. That’s all I wanted",

    "You don’t need a reason to laugh.\nThis is your random one 😆",

    "I hope this made your face do that little smile thing 😄",

    "Okay that’s enough nonsense for now 😂\nBut I hope it helped a bit"
  ],

  confidence: [
    "You don’t need to be perfect to be powerful ✨\nYou’re already enough as you are.",

    "Even on days you doubt yourself 🤍\nYou’re still capable of more than you think.",

    "You’ve handled hard things before.\nThis is just another moment—and you’ve got this 💪✨",

    "Confidence doesn’t mean never feeling scared 😌\nIt means moving forward anyway.",

    "You don’t need permission to take up space 🤍\nYour presence belongs here.",

    "You are allowed to trust yourself ✨\nYou’ve earned that trust through everything you’ve survived.",

    "Even if your voice shakes 😌\nIt still deserves to be heard.",

    "You are not behind in life 🤍\nYou’re exactly where you need to be right now.",

    "Your worth is not measured by productivity ✨\nYou matter even when you’re resting.",

    "You’ve grown more than you realize 🤍\nLook at how far you’ve already come.",

    "You don’t have to compare your journey to anyone else 😌\nYours is valid on its own.",

    "Confidence can be quiet ✨\nIt can look like showing up even when it’s hard.",

    "You are capable of learning, adapting, and trying again 🤍\nThat’s real strength.",

    "You don’t need to prove anything today 😌\nBeing you is enough.",

    "Even when you feel unsure ✨\nYou are still allowed to believe in yourself.",

    "You have a steady kind of strength 🤍\nThe kind that lasts.",

    "It’s okay to take things one step at a time 😌\nProgress doesn’t have to be loud.",

    "You deserve good things—not because you earned them, but because you exist ✨",

    "Your effort matters, even when results take time 🤍\nDon’t underestimate yourself.",

    "You are more resilient than you give yourself credit for 😌\nYou’re still standing.",

    "Confidence doesn’t mean having all the answers ✨\nIt means trusting you’ll figure them out.",

    "You don’t have to rush your growth 🤍\nYou’re allowed to unfold at your own pace.",

    "Even if today feels uncertain 😌\nYou still have what it takes to handle it.",

    "You are allowed to feel proud of yourself ✨\nEven for small victories.",

    "Your ideas and thoughts have value 🤍\nThey deserve attention.",

    "You’ve been stronger than you ever planned to be 😌\nThat strength is still with you.",

    "You don’t need external validation to be worthy ✨\nYou already are.",

    "Confidence can start as a whisper 🤍\nIt grows the more you listen to it.",

    "You are capable of handling whatever comes next 😌\nOne moment at a time.",

    "You don’t need to shrink yourself for others ✨\nYou’re allowed to shine.",

    "Even when you feel unsure 🤍\nYou are still doing your best—and that counts.",

    "You’ve learned from your past, not been defined by it 😌\nThat’s growth.",

    "You are allowed to believe good things about yourself ✨\nIt’s not arrogance—it’s honesty.",

    "Confidence isn’t about being fearless 🤍\nIt’s about trusting yourself anyway.",

    "You are steady, capable, and enough—right now 😌✨"
  ],
  tired: [
    "Hey sleepy sya 😴\nYou’ve done enough for today 🤍",

    "You don’t need to push anymore 🫶\nRest now",

    "Close your eyes for a bit 🌙\nI’ll stay right here",

    "Being tired doesn’t mean you failed 🥺\nIt just means you tried 🤍",

    "Come here…\nlet today end softly 🫂",

    "You can stop holding everything together now 😴🤍",

    "Hey rabbit 🐰\nCurl up and breathe slowly\nYou’re safe",

    "Even strong hearts need rest 💗\nYours included",

    "You’ve been carrying a lot today 😌\nPut it down now",

    "If your body feels heavy,\nlet the bed do the work 💤",

    "No thinking.\nNo worrying.\nJust rest 🤍",

    "Tired days still count 🫶\nBe gentle with yourself",

    "I wish I could tuck you in right now 🥺🌙",

    "Let your thoughts slow down…\none breath at a time 😴",

    "It’s okay to sleep without fixing everything 🤍",

    "Hey… you did your best today 🫂\nThat’s enough",

    "If your eyes are heavy, listen to them 😌",

    "Rest isn’t laziness.\nIt’s care 🤍",

    "Come rest with me in this quiet moment 🌙",

    "You don’t have to be productive tonight 💤\nJust exist",

    "Sleepy rabbit energy detected 🐰😴\nRest approved",

    "Let tomorrow worry about itself 🤍\nTonight is for rest",

    "Your body deserves kindness too 🫶",

    "Even the day knows it’s time to end 🌙\nSo can you",

    "It’s okay if all you do now is breathe 😴",

    "No expectations.\nNo pressure.\nJust rest 🤍",

    "I hope you fall asleep feeling a little lighter 🫂",

    "You don’t need to be strong right now 🥺\nSleep",

    "Let the quiet hold you for a while 🌙",

    "I’m proud of you for making it through today 🤍",

    "Close your eyes, sya 😴\nTomorrow can wait",

    "Rest is part of healing too 🫶",

    "If today drained you, let sleep refill you 💤",

    "You’re allowed to stop now 🤍",

    "Good rest, sleepy sya 😴🌙"
  ]



};
/* ================= RARE HIDDEN LETTERS ================= */
const rareLetters = [
  "You weren’t meant to find this.\nBut maybe you needed it.\nStay a little longer.",

  "If you’re still here,\nthat means something inside you is asking for care.",

  "This space remembers you.\nEven when you feel forgettable.",

  "You don’t come here by accident.\nYou come here when you need softness.",

  "I hope you’re being gentle with yourself right now.",

  "If this feels personal,\nit’s because it is.",

  "You stayed.\nThat matters.",

  "Even quiet hearts deserve attention.",

  "I’m glad you opened this.\nEven if you don’t know why.",

  "Some letters only appear when you need them."
];


/* ================= MUSIC DATA ================= */
const music = {
  happy: [
    "https://www.youtube.com/watch?v=P3cffdsEXXw", // Golden
    "https://www.youtube.com/watch?v=G5xSLbYMr-I", // Sunroof
    "https://www.youtube.com/watch?v=Y2V6yjjPbX0", // Sunday Best
    "https://www.youtube.com/watch?v=eimgRedLkkU", // Put Your Records On
    "https://www.youtube.com/watch?v=rjOhZZyn30k"  // Walking on a Dream
  ],

  sad: [
    "https://www.youtube.com/watch?v=k4V3Mo61fJM",
    "https://www.youtube.com/watch?v=zABLecsR5UE",
    "https://www.youtube.com/watch?v=BTVU5GZ8g_8",
    "https://www.youtube.com/watch?v=mtf7hC17IBM",
    "https://www.youtube.com/watch?v=gI2X6kD3C6I"
  ],

  angry: [
    "https://www.youtube.com/watch?v=kXYiU_JCYtU",
    "https://www.youtube.com/watch?v=2vjPBrBU-TM",
    "https://www.youtube.com/watch?v=7wtfhZwyrcc",
    "https://www.youtube.com/watch?v=_Yhyp-_hX2s",
    "https://www.youtube.com/watch?v=bEeaS6fuUoA"
  ],

  lonely: [
    "https://www.youtube.com/watch?v=9WbCfHutDSE",
    "https://www.youtube.com/watch?v=yKNxeF4KMsY",
    "https://www.youtube.com/watch?v=1vXzGv0oD1E",
    "https://www.youtube.com/watch?v=lAwYodrBr2Q",
    "https://www.youtube.com/watch?v=7cL9qJ0LJtY"
  ],

  laugh: [
    "https://www.youtube.com/watch?v=ZbZSe6N_BXs",
    "https://www.youtube.com/watch?v=OPf0YbXqDm0",
    "https://www.youtube.com/watch?v=ru0K8uYEZWw",
    "https://www.youtube.com/watch?v=qpgTC9MDx1o",
    "https://www.youtube.com/watch?v=E07s5ZYygMg"
  ],

  confidence: [
    "https://www.youtube.com/watch?v=cxjvTXo9WWM",
    "https://www.youtube.com/watch?v=QUQsqBqxoR4",
    "https://www.youtube.com/watch?v=CevxZvSJLk8",
    "https://www.youtube.com/watch?v=pxBQLFLei70",
    "https://www.youtube.com/watch?v=kNKu1uNBVkU"
  ]
};


/* ================= SECRET MESSAGES ================= */
const firstVisitMessage =
  "Hi sya 🤍\nI made this space for you.\nFor days you don’t know what you need.\nI hope it helps, even a little.\n— bubu";

const clickSecretMessage =
  "Hey sya… 🤍\nIf you’re still clicking,\nit means you really needed comfort.\nI’m really glad you came here.\n— bubu";

const lonelySecretMessage =
  "This one is only for you, sya 🫂\nNo matter how alone you feel,\nyou don’t have to face it without me.\n— bubu";

const nightSecretMessage =
  "It’s late, sya 🌙\nIf you’re awake right now,\nI hope this makes you feel a little less alone.\nSleep when you’re ready 🤍\n— bubu";

const rareSecretMessage =
  "You weren’t supposed to find this… 🐰\nBut since you did,\nI meant every word I ever wrote for you.\n— bubu";

/* ================= HELPERS ================= */
function getRandomMessage(mood) {
  const list = messages[mood];
  if (!list || list.length === 0) return "";

  let newMessage;
  do {
    newMessage = list[Math.floor(Math.random() * list.length)];
  } while (newMessage === lastMessageByMood[mood] && list.length > 1);

  lastMessageByMood[mood] = newMessage;
  return newMessage;
}


function getRandomSignature() {
  return Math.random() < 0.5 ? "— bubu" : "— bhabha";
}

function isLateNight() {
  const hour = new Date().getHours();
  return hour >= 23 || hour <= 4;
}

/* ================= SCREEN CONTROL ================= */
function showMessageScreen(mood) {
  currentMood = mood;
  clickCount = 0;

  // 🔥 RESET previous state
  pendingMessage = "";
  messageText.textContent = "";
  envelope.classList.remove("open");

  homeScreen.classList.remove("active");
  messageScreen.classList.add("active");


  document.body.className = "";
  document.body.classList.add(`mood-${mood}`);

  if (mood === "tired") {
    envelope.classList.add("open");
  } else {
    envelope.classList.remove("open");
  }

  messageText.textContent = "";
  signatureText.textContent = "";

  updateMessage(true);

  // 🤍 Auto-open first message with a cozy delay
  setTimeout(() => {
    if (pendingMessage) {
      messageText.textContent = pendingMessage;
      envelope.classList.add("open");
    }
  }, 400);
}

function showHomeScreen() {
  messageScreen.classList.remove("active");
  homeScreen.classList.add("active");

  document.body.className = "";
  currentMood = null;

  // 🔥 RESET everything
  pendingMessage = "";
  messageText.textContent = "";
  envelope.classList.remove("open");
}


/* ================= MESSAGE LOGIC ================= */
function updateMessage(isFirstLoad = false) {
  if (!currentMood) return;

  let message;

  // 🌙 Late-night tired secret
  if (currentMood === "tired" && isLateNight() && Math.random() < 0.5) {
    message = "It’s really late.\nYou don’t need to read anymore.\nJust rest.";
  }

  // 🐰 Many clicks
  else if (clickCount === 7 || clickCount === 12 || clickCount === 20) {
    message = "You stayed for a while.\nI hope it helped.\nEven a little.";
  }

  // ✨ Ultra rare
  else if (Math.random() < 0.01) {
    message = rareLetters[Math.floor(Math.random() * rareLetters.length)];
  }

  // 💌 Normal
  else {
    message = getRandomMessage(currentMood);
  }

  // Store message - will display when user taps envelope
  pendingMessage = message;

  // Reset UI
  messageText.textContent = "";

  if (!isFirstLoad) {
    envelope.classList.remove("open");
  }

  clickCount++;
}


/* ================= EVENTS ================= */
moodButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    showMessageScreen(btn.dataset.mood);
  });
});

envelope.addEventListener("click", () => {
  if (!pendingMessage) return;

  messageText.textContent = pendingMessage;
  envelope.classList.add("open");
});



anotherBtn.addEventListener("click", () => {
  updateMessage();
});

backBtn.addEventListener("click", showHomeScreen);

musicBtn.addEventListener("click", () => {
  if (!currentMood || !music[currentMood]) return;

  const list = music[currentMood];
  const song = list[Math.floor(Math.random() * list.length)];
  window.open(song, "_blank");
});

function applyNightMode() {
  const hour = new Date().getHours();
  if (hour >= 23 || hour <= 4) {
    document.body.classList.add("night-mode");
  } else {
    document.body.classList.remove("night-mode");
  }
}

applyNightMode();

const dateBtn = document.getElementById("date-ideas-btn");
const dateScreen = document.getElementById("date-screen");
const dateList = document.getElementById("date-list");
const dateInput = document.getElementById("date-input");
const addDateBtn = document.getElementById("add-date-btn");
const backToModesBtn = document.getElementById("back-to-moods");
function getDates() {
  return JSON.parse(localStorage.getItem("dateIdeas")) || [];
}

function saveDates(dates) {
  localStorage.setItem("dateIdeas", JSON.stringify(dates));
}
function renderDates() {
  dateList.innerHTML = "";
  const dates = getDates();

  dates.forEach((text, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;

    const editBtn = document.createElement("button");
    editBtn.textContent = "edit";
    editBtn.onclick = () => {
      const newText = prompt("edit date idea", text);
      if (newText) {
        dates[index] = newText;
        saveDates(dates);
        renderDates();
      }
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "×";
    delBtn.onclick = () => {
      dates.splice(index, 1);
      saveDates(dates);
      renderDates();
    };

    li.append(span, editBtn, delBtn);
    dateList.appendChild(li);
  });
}

/* ================= DATE IDEAS EVENT LISTENERS ================= */
dateBtn.addEventListener("click", () => {
  homeScreen.classList.remove("active");
  dateScreen.classList.add("active");
  renderDates();
});

backToModesBtn.addEventListener("click", showHomeScreen);

addDateBtn.addEventListener("click", () => {
  const newIdea = dateInput.value.trim();
  if (newIdea) {
    const dates = getDates();
    dates.push(newIdea);
    saveDates(dates);
    dateInput.value = "";
    renderDates();
  }
});

dateInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addDateBtn.click();
  }
});

/* Initialize date ideas on load */
renderDates();

/* ================= DATE IDEAS EVENT LISTENERS ================= */
dateBtn.addEventListener("click", () => {
  homeScreen.classList.remove("active");
  dateScreen.classList.add("active");
  renderDates();
});

backToModesBtn.addEventListener("click", showHomeScreen);

addDateBtn.addEventListener("click", () => {
  const newIdea = dateInput.value.trim();
  if (newIdea) {
    const dates = getDates();
    dates.push(newIdea);
    saveDates(dates);
    dateInput.value = "";
    renderDates();
  }
});

dateInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addDateBtn.click();
  }
});

/* Initialize date ideas on load */
renderDates();
