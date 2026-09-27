// Content generation logic for the Restaurant AI Assistant.
// Uses template-based generation to produce professional content from user input.

export type Tone = 'professional' | 'casual' | 'playful';

export const toneLabels: Record<Tone, string> = {
  professional: 'Professional',
  casual: 'Casual',
  playful: 'Playful',
};

export type GenerateResult = {
  title: string;
  body: string;
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clean(input: string): string {
  return input.trim().replace(/\s+/g, ' ');
}

function parseDish(text: string) {
  const parts = text.split(',').map((s) => s.trim());
  const dishName = parts[0] || text;
  const ingredients = parts.slice(1).filter(Boolean).join(', ');
  return { dishName, ingredients };
}

// 1. Menu Description Generator
export function generateMenuDescription(input: string, tone: Tone): GenerateResult {
  const text = clean(input);
  if (!text) return { title: 'Menu Description', body: '' };

  const { dishName, ingredients } = parseDish(text);

  const toneOpenings: Record<Tone, string[]> = {
    professional: [
      `Our signature ${dishName.toLowerCase()}`,
      `A refined preparation of ${dishName.toLowerCase()}`,
      `Expertly crafted ${dishName.toLowerCase()}`,
      `A classic ${dishName.toLowerCase()}`,
    ],
    casual: [
      `Tender ${dishName.toLowerCase()}`,
      `Our hearty ${dishName.toLowerCase()}`,
      `A generous portion of ${dishName.toLowerCase()}`,
      `Slow-cooked ${dishName.toLowerCase()}`,
    ],
    playful: [
      `Prepare to fall in love with our ${dishName.toLowerCase()}`,
      `The one and only ${dishName.toLowerCase()}`,
      `Meet your new obsession — ${dishName.toLowerCase()}`,
      `Warning: our ${dishName.toLowerCase()} is dangerously good`,
    ],
  };

  const toneMiddles: Record<Tone, string[]> = {
    professional: ingredients
      ? [
          `featuring ${ingredients}`,
          `prepared with premium ${ingredients}`,
          `highlighting ${ingredients}`,
        ]
      : [
          'prepared with the finest seasonal ingredients',
          'crafted with attention to every detail',
          'made using time-honored techniques',
        ],
    casual: ingredients
      ? [
          `loaded with ${ingredients}`,
          `made with fresh ${ingredients}`,
          `topped with ${ingredients}`,
        ]
      : [
          'made fresh every day',
          'cooked just the way you like it',
          'seasoned with our house blend',
        ],
    playful: ingredients
      ? [
          `packed with ${ingredients}`,
          `stuffed with ${ingredients} — yes, really`,
          `loaded with ${ingredients} and zero regrets`,
        ]
      : [
          'made with a whole lot of love',
          'so good it should be illegal',
          'the kind of dish dreams are made of',
        ],
  };

  const toneClosings: Record<Tone, string[]> = {
    professional: [
      'A dish that exemplifies our commitment to quality.',
      'Served with your choice of accompaniment.',
      'A distinguished addition to our menu.',
    ],
    casual: [
      'Served with your choice of side.',
      'A dish that keeps our guests coming back.',
      'Perfect for any occasion.',
    ],
    playful: [
      'One bite and you\'ll be hooked — we warned you!',
      'Come hungry, leave happy.',
      'Your taste buds called — they said thank you.',
    ],
  };

  const body = `${pick(toneOpenings[tone])}, ${pick(toneMiddles[tone])}. ${pick(toneClosings[tone])}`;
  return { title: 'Menu Description', body };
}

// 2. Instagram Caption Generator
export function generateInstagramCaption(input: string, tone: Tone): GenerateResult {
  const text = clean(input);
  if (!text) return { title: 'Instagram Caption', body: '' };

  const toneHooks: Record<Tone, string[]> = {
    professional: [
      `Now available: ${text}. Experience it for yourself.`,
      `Introducing ${text} — a new standard in dining.`,
      `We are proud to present ${text}.`,
    ],
    casual: [
      `Craving something delicious? ${text} is calling your name!`,
      `Freshly made, beautifully plated, and ready for you. ${text} at its finest.`,
      `Your taste buds will thank you. ${text} is now on the menu!`,
    ],
    playful: [
      `Stop scrolling. Look at this beauty. ${text} has entered the chat.`,
      `This is not a drill. ${text} is here and it\'s everything you need today.`,
      `We made ${text} and honestly? We outdid ourselves.`,
    ],
  };

  const toneCTAs: Record<Tone, string[]> = {
    professional: [
      'Reserve your table today — link in bio.',
      'Available now. We look forward to serving you.',
      'Visit us to experience this and more.',
    ],
    casual: [
      'Tag someone who needs to try this!',
      'Come taste it today — link in bio for reservations.',
      'Drop a comment if you\'d order this!',
    ],
    playful: [
      'Tag your foodie partner in crime below!',
      'Save this post before it disappears (literally, it sells out fast).',
      'Double-tap if this just made you hungry.',
    ],
  };

  const hashtagSets = [
    '#foodie #restaurant #instafood #foodphotography #delicious #foodlover #yummy #fresh #foodstagram #dinner',
    '#foodporn #instagood #tasty #foodgasm #chefslife #foodblogger #eatlocal #supportlocal #foodtrip #mouthwatering',
    '#dinnerideas #lunchspot #foodgram #culinary #gourmet #foodpics #eatout #foodiegram #restaurantlife #flavor',
    '#foodinspiration #plating #chef #cooking #foodart #savory #comfortfood #dineout #foodpost #explore',
  ];

  const body = `${pick(toneHooks[tone])}\n\n${pick(toneCTAs[tone])}\n\n${pick(hashtagSets)}`;
  return { title: 'Instagram Caption', body };
}

// 3. WhatsApp Promotional Message Generator
export function generateWhatsAppMessage(input: string, tone: Tone): GenerateResult {
  const text = clean(input);
  if (!text) return { title: 'WhatsApp Message', body: '' };

  const toneGreetings: Record<Tone, string[]> = {
    professional: [
      'Dear valued customer,',
      'Greetings from our team.',
      'We are delighted to share an update with you.',
    ],
    casual: [
      'Hi there! We have something special for you.',
      'Hello! Got some exciting news to share.',
      'Hey! You\'re going to love this.',
    ],
    playful: [
      'Guess what just landed on our menu?',
      'Alert: deliciousness incoming!',
      'Stop what you\'re doing — this is important.',
    ],
  };

  const toneOffers: Record<Tone, string[]> = {
    professional: [
      `${text} — available for a limited time.`,
      `We are pleased to announce: ${text}.`,
      `As a valued customer, we invite you to enjoy: ${text}.`,
    ],
    casual: [
      `${text} — available for a limited time only!`,
      `We're excited to share: ${text}.`,
      `Just for you: ${text}. Don't miss out!`,
    ],
    playful: [
      `Ready for this? ${text} — yes, it's as good as it sounds.`,
      `Drumroll please... ${text} is here!`,
      `You heard it here first: ${text}. You\'re welcome.`,
    ],
  };

  const toneClosings: Record<Tone, string[]> = {
    professional: [
      'Reply to this message to reserve yours today.',
      'We look forward to welcoming you soon.',
      'This offer is valid while supplies last.',
    ],
    casual: [
      'Reply YES to reserve yours today.',
      'Visit us soon — we can\'t wait to serve you!',
      'Show this message in-store to redeem your offer.',
    ],
    playful: [
      'Don\'t sleep on this — reply YES and it\'s yours!',
      'Hurry in before it\'s gone — you\'ve been warned.',
      'See you soon? We certainly hope so!',
    ],
  };

  const body = `${pick(toneGreetings[tone])}\n\n${pick(toneOffers[tone])}\n\n${pick(toneClosings[tone])}\n\n— [Your Restaurant Name]`;
  return { title: 'WhatsApp Message', body };
}

// 4. Customer Complaint Reply Generator
export function generateComplaintReply(input: string, tone: Tone): GenerateResult {
  const text = clean(input);
  if (!text) return { title: 'Complaint Reply', body: '' };

  const toneOpenings: Record<Tone, string[]> = {
    professional: [
      `Thank you for taking the time to share your feedback regarding ${text.toLowerCase()}.`,
      `We sincerely appreciate you bringing this matter to our attention.`,
      `Your feedback is invaluable to us, and we take your comments very seriously.`,
    ],
    casual: [
      `Thank you so much for reaching out about ${text.toLowerCase()}. We hear you.`,
      `We're really sorry your experience didn't meet expectations. Thank you for telling us.`,
      `We appreciate you sharing this with us — it's the only way we get better.`,
    ],
    playful: [
      `We owe you an apology, and we want to make it right. Thank you for speaking up about ${text.toLowerCase()}.`,
      `You caught us on an off day, and we're sorry. Here's what we'd like to do.`,
      `Nobody likes hearing this, but we're grateful you said it. Let us fix this.`,
    ],
  };

  const toneMiddles: Record<Tone, string[]> = {
    professional: [
      'This does not reflect the standards we strive to uphold, and we are already reviewing the matter with our team.',
      'We are committed to providing every guest with an exceptional experience, and it is clear we fell short on this occasion.',
      'We have taken immediate steps to address the situation and prevent a recurrence.',
    ],
    casual: [
      'This isn\'t the standard we aim for, and we\'re already looking into what went wrong.',
      'We want every visit to be great, and we\'re sorry this one wasn\'t.',
      'We\'ve shared your feedback with our team so we can do better next time.',
    ],
    playful: [
      'We\'re not too proud to say we messed up, and we\'re already on it.',
      'We dropped the ball, and we\'re determined to pick it back up.',
      'Consider this noted, shared with the team, and fixed for next time.',
    ],
  };

  const toneClosings: Record<Tone, string[]> = {
    professional: [
      'We would welcome the opportunity to discuss this further. Please contact us at [phone/email] at your convenience.',
      'As a gesture of our goodwill, we would like to invite you back as our guest. Please reach us at [phone/email].',
      'We hope you will give us another chance to provide the experience you deserve. Contact us at [phone/email].',
    ],
    casual: [
      'We\'d love to make this right. Please reach out at [phone/email] and we\'ll sort it out.',
      'How about a meal on us next time? Call us at [phone/email] and we\'ll set it up.',
      'We hope you\'ll give us another try. Drop us a line at [phone/email].',
    ],
    playful: [
      'Let us make it up to you — dinner\'s on us. Reach out at [phone/email] and we\'ll make it happen.',
      'We\'d love a do-over. Call us at [phone/email] and we\'ll roll out the red carpet.',
      'Round two is on us. Contact us at [phone/email] — we promise a much better time.',
    ],
  };

  const body = `${pick(toneOpenings[tone])} ${pick(toneMiddles[tone])} ${pick(toneClosings[tone])}\n\nWarm regards,\n[Your Name]\n[Your Restaurant Name]`;
  return { title: 'Complaint Reply', body };
}

// 5. Daily Special / Offer Generator
export function generateDailySpecial(input: string, tone: Tone): GenerateResult {
  const text = clean(input);
  if (!text) return { title: 'Daily Special', body: '' };

  const toneIntros: Record<Tone, string[]> = {
    professional: [
      `Today's special: ${text}.`,
      `Chef's selection: ${text}.`,
      `We are pleased to offer: ${text}.`,
    ],
    casual: [
      `Today's special: ${text}!`,
      `Chef's pick today: ${text}.`,
      `Today only: ${text}!`,
    ],
    playful: [
      `Today's star: ${text}!`,
      `Drumroll... today's special is ${text}!`,
      `You didn't see this coming: ${text} is today's special!`,
    ],
  };

  const toneDetails: Record<Tone, string[]> = {
    professional: [
      'Prepared fresh with locally sourced ingredients.',
      'Available while supplies last.',
      'A limited-time addition to our menu.',
    ],
    casual: [
      'Made fresh with locally sourced ingredients.',
      'Available while supplies last — first come, first served.',
      'Perfect for lunch or dinner today.',
    ],
    playful: [
      'Made fresh, gone fast — don\'t say we didn\'t warn you.',
      'Limited quantities, unlimited flavor.',
      'Get here before it disappears — seriously.',
    ],
  };

  const toneCTAs: Record<Tone, string[]> = {
    professional: [
      'We invite you to join us today.',
      'Reserve your table by calling [phone number].',
      'Available for dine-in and takeaway.',
    ],
    casual: [
      'Come in today to enjoy this special!',
      'Call ahead to reserve yours: [phone number]',
      'Available for dine-in and takeaway.',
    ],
    playful: [
      'Run, don\'t walk — come get it today!',
      'Call [phone number] to claim yours before it\'s gone.',
      'Dine-in, takeaway, or just come stare at it — your call!',
    ],
  };

  const body = `${pick(toneIntros[tone])}\n\n${pick(toneDetails[tone])}\n\n${pick(toneCTAs[tone])}`;
  return { title: 'Daily Special', body };
}

export type GeneratorFn = (input: string, tone: Tone) => GenerateResult;
