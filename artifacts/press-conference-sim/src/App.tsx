import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useEvaluatePressConferenceAnswer,
  type PressConferenceAnswerScore,
} from '@workspace/api-client-react';
import { GlassFold } from '@/components/ui/glass-fold';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowRight, Check, RotateCcw, Shield, MessageSquareText, Radio, AlertCircle } from 'lucide-react';
import {
  createQuestionRun,
  ROUNDS,
  type GameQuestion,
  type GameRound,
} from './game';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  type Response = { answer: string; breakdown: PressConferenceAnswerScore };
  const scoreAnswerMutation = useEvaluatePressConferenceAnswer();
  const [stage, setStage] = useState<'start' | 'playing' | 'feedback' | 'results'>('start');
  const [current, setCurrent] = useState(0);
  const [runRounds, setRunRounds] = useState<GameRound[]>(ROUNDS);
  const [hasStartedOnce, setHasStartedOnce] = useState(false);
  const [answer, setAnswer] = useState('');
  const [responses, setResponses] = useState<Response[]>([]);
  const [validation, setValidation] = useState('');
  const roundIndex = Math.floor(current / 3);
  const question = runRounds[roundIndex].questions[current % 3];
  const response = responses[current]!;
  const allQuestions = runRounds.flatMap((round) => round.questions);
  const runTotal = Math.round(responses.reduce((sum, item) => sum + item.breakdown.total, 0) / 9);
  const roundTotals = runRounds.map((_, index) => {
    const completed = responses.slice(index * 3, index * 3 + 3);
    return completed.length ? Math.round(completed.reduce((sum, item) => sum + item.breakdown.total, 0) / 3) : 0;
  });

  function startRun() {
    setRunRounds(createQuestionRun(hasStartedOnce ? runRounds : undefined));
    setHasStartedOnce(true);
    setCurrent(0); setResponses([]); setAnswer(''); setValidation(''); setStage('playing');
  }
  async function submitAnswer() {
    if (!answer.trim()) {
      setValidation('The microphones are live. Please enter an answer before submitting.');
      return;
    }
    setValidation('');
    try {
      const breakdown = await scoreAnswerMutation.mutateAsync({
        data: { question: question.prompt, answer: answer.trim() },
      });
      const next = [...responses];
      next[current] = { answer: answer.trim(), breakdown };
      setResponses(next);
      setStage('feedback');
    } catch {
      setValidation('The scoring desk could not evaluate that answer. Please try again.');
    }
  }
  function nextQuestion() {
    if (current === 8) { setStage('results'); return; }
    setCurrent((value) => value + 1); setAnswer(''); setStage('playing');
  }
  function scoreLabel(score: number) {
    return score >= 85 ? 'Composed under fire' : score >= 65 ? 'A workable statement' : score >= 40 ? 'The room has concerns' : 'No further questions';
  }

  return (
    <main className={`briefing-shell ${stage === 'playing' || stage === 'feedback' ? `round-mood-${roundIndex}` : ''}`}>
      <header className="masthead">
        <div className="masthead-inner">
          <div className="brand-lockup"><span className="brand-seal"><Radio size={17} /></span><span>THE DAILY <b>BRIEF</b></span></div>
          <div className="masthead-status"><span className="live-dot" /> SIMULATION IN SESSION</div>
          <div className="edition">SPECIAL EDITION <span>•</span> NO. 009</div>
        </div>
      </header>
      <div className="page-frame">
        {stage === 'start' && (
          <section className="intro-layout" aria-labelledby="page-title">
            <div className="intro-copy">
              <div className="eyebrow"><span className="eyebrow-rule" /> A PUBLIC STATEMENT EXERCISE</div>
              <h1 id="page-title">The room is<br /><em>waiting.</em></h1>
              <p className="intro-deck">Nine questions. Three rounds. A different mix of absurdities every time.</p>
              <div className="intro-meta"><span><b>03</b> ROUNDS</span><i /> <span><b>09</b> QUESTIONS</span><i /> <span><b>01</b> ANSWER EACH</span></div>
              <LiquidButton
                className="start-button bg-[rgba(141,59,50,0.35)] text-[#fff8ed] font-semibold tracking-wide"
                size="xl"
                onClick={startRun}
                data-testid="button-start"
              >
                Take the podium <ArrowRight size={18} />
              </LiquidButton>
              <div className="no-prep"><Shield size={15} /> No prep. No second takes. Just you and the press.</div>
            </div>
            <aside className="briefing-card">
              <div className="card-kicker"><span>BEFORE THE CAMERAS</span><span>READ IN</span></div>
              <div className="glass-fold-band" aria-hidden="true">
                <GlassFold
                  color1="#8d3b32"
                  color2="#201b18"
                  color3="#e5c39b"
                  speed={0.22}
                  scale={0.85}
                  noise={0.035}
                />
                <span>ON AIR <i /> LIVE FEED</span>
              </div>
              <h2>Four rules for<br />getting through it.</h2>
              <ol className="rules-list">
                <li><span className="rule-number">01</span><div><b>Answer the question asked.</b><small>Stay focused on the exact detail in front of you.</small></div></li>
                <li><span className="rule-number">02</span><div><b>Keep your composure.</b><small>Sound calm, as if the stakes are entirely real.</small></div></li>
                <li><span className="rule-number">03</span><div><b>Don't confess.</b><small>Avoid directly admitting to the accusation.</small></div></li>
                <li><span className="rule-number">04</span><div><b>Don't point fingers.</b><small>Resist the urge to dump blame on someone else.</small></div></li>
              </ol>
              <div className="rubric-note"><AlertCircle size={15} /><span>A contextual evaluator reads what you mean—not just which words you use.</span></div>
            </aside>
            <div className="intro-bottom"><span>YOUR STATEMENT WILL BE ON THE RECORD</span><span>PLEASE KEEP IT BRIEF</span></div>
          </section>
        )}

        {(stage === 'playing' || stage === 'feedback') && question && (
          <section className="game-layout" aria-live="polite">
            <div className="game-heading">
              <div className="eyebrow"><span className="eyebrow-rule" /> PRESS CONFERENCE <span className="slash">/</span> ROUND 0{roundIndex + 1}</div>
              <div className="game-heading-row">
                <div><h1>{runRounds[roundIndex].name}<span className="period">.</span></h1><p className="round-subtitle">{runRounds[roundIndex].tone}</p></div>
                <div className="question-count"><b>0{current + 1}</b><span> / 09</span><small>QUESTION</small></div>
              </div>
              <div className="progress-track" aria-label={`Question ${current + 1} of 9`}><div className="progress-fill" style={{ width: `${((current + (stage === 'feedback' ? 1 : 0)) / 9) * 100}%` }} /></div>
            </div>
            <div className="conference-grid">
              <div className="question-panel">
                <div className="reporter-line"><span className="reporter-mark"><MessageSquareText size={17} /></span><div><b>REPORTER QUESTION</b><small>ON THE RECORD · {roundIndex === 0 ? 'CITY DESK' : roundIndex === 1 ? 'CULTURE DESK' : 'WORLD DESK'}</small></div><span className="mic-status"><span /> LIVE</span></div>
                <blockquote>{question.prompt}</blockquote>
                {stage === 'playing' ? (
                  <form className="answer-form" onSubmit={(event) => { event.preventDefault(); if (scoreAnswerMutation.isPending) return; submitAnswer(); }}>
                    <label htmlFor="statement">YOUR STATEMENT <span>({answer.length}/500)</span></label>
                    <input type="text" id="statement" data-testid="input-answer" maxLength={500} value={answer} onChange={(event) => { setAnswer(event.target.value); if (validation) setValidation(''); }} placeholder="Take a breath. The room is listening…" autoFocus />
                    {validation && <p className="validation-message" role="alert"><AlertCircle size={15} />{validation}</p>}
                    <div className="submit-row"><span>{scoreAnswerMutation.isPending ? 'The scoring desk is reviewing your statement…' : 'One answer. Make it count.'}</span><LiquidButton className="min-w-[172px] bg-[rgba(141,59,50,0.35)] text-[#fff8ed] font-semibold tracking-wide" type="submit" size="lg" disabled={scoreAnswerMutation.isPending} data-testid="button-submit-answer">{scoreAnswerMutation.isPending ? 'Reviewing…' : 'Deliver statement'} <ArrowRight size={17} /></LiquidButton></div>
                  </form>
                ) : (
                  <div className="answer-result" data-testid={`result-answer-${current}`}>
                    <div className="answer-label">YOUR ANSWER</div>
                    <p className="answer-quote">“{response.answer}”</p>
                    <div className="result-score-line"><div className="result-score"><b>{response.breakdown.total}</b><span>/100</span></div><div><strong>{scoreLabel(response.breakdown.total)}</strong><small>{response.breakdown.validEnglish ? 'QUESTION SCORE · CONTEXTUAL REVIEW' : 'NO SCORE · UNINTELLIGIBLE ANSWER'}</small></div></div>
                    <div className="score-breakdown">
                      <ScoreRow label="Question relevance" score={response.breakdown.relevance} max={60} rationale={response.breakdown.rationales.relevance} />
                      <ScoreRow label="Composure" score={response.breakdown.composure} max={15} rationale={response.breakdown.rationales.composure} />
                      <ScoreRow label="Careful non-admission" score={response.breakdown.nonAdmission} max={15} rationale={response.breakdown.rationales.nonAdmission} />
                      <ScoreRow label="Fair blame" score={response.breakdown.fairBlame} max={10} rationale={response.breakdown.rationales.fairBlame} />
                    </div>
                    <p className="result-feedback">{response.breakdown.feedback}</p>
                    <button className="primary-button continue-button" onClick={nextQuestion} data-testid="button-continue">{current === 8 ? 'See final statement' : 'Next question'} <ArrowRight size={17} /></button>
                  </div>
                )}
              </div>
              <aside className="sidebar-brief">
                <div className="sidebar-title">THE RUN OF SHOW <span>09 TOTAL</span></div>
                {runRounds.map((round, r) => (
                  <div className={`round-list ${r === roundIndex ? 'active' : ''}`} key={round.id}>
                    <div className="round-list-head"><b>0{r + 1}</b><span>{round.name}</span><small>{r === 0 ? 'STRAIGHT' : r === 1 ? 'ODD' : 'ABSURD'}</small></div>
                    <div className="mini-question-list">{round.questions.map((item, q) => {
                      const index = r * 3 + q;
                      const isDone = index < responses.length;
                      return <div className={`mini-question ${index === current ? 'current' : ''} ${isDone ? 'done' : ''}`} key={item.id}><span>{isDone ? <Check size={12} /> : `0${index + 1}`}</span><p>{item.prompt}</p></div>;
                    })}</div>
                  </div>
                ))}
                <div className="sidebar-footnote"><Shield size={15} /><span>Every response stays on the record until your final score.</span></div>
              </aside>
            </div>
          </section>
        )}

        {stage === 'results' && (
          <section className="final-layout" aria-labelledby="final-title">
            <div className="eyebrow"><span className="eyebrow-rule" /> THE BRIEFING IS ADJOURNED</div>
            <div className="final-topline"><div><h1 id="final-title">Your statement<br /><em>is on the record.</em></h1><p className="intro-deck">Nine answers. One very patient press corps.</p></div>
              <div className="final-score-card"><span>OVERALL SCORE</span><b>{runTotal}</b><small>/ 100 · {scoreLabel(runTotal)}</small></div>
            </div>
            <div className="results-columns">
              <div className="round-breakdown">
                <div className="section-head"><span>ROUND BREAKDOWN</span><small>AVERAGE SCORE / 100</small></div>
                {runRounds.map((round, index) => <div className="round-score-row" key={round.id}><div className="round-score-title"><span>0{index + 1}</span><div><b>{round.name}</b><small>{round.tone}</small></div></div><div className="round-score-meter"><i style={{ width: `${roundTotals[index]}%` }} /></div><strong>{roundTotals[index]}</strong></div>)}
                <div className="final-rubric"><AlertCircle size={16} /><p><b>Meaning matters more than matching phrases.</b><br />Each answer is judged against its question. Relevance is worth 60 points, composure 15, careful non-admission 15, and fair blame 10. Unintelligible answers receive zero across the board.</p></div>
                <button className="primary-button replay-button" onClick={startRun} data-testid="button-replay"><RotateCcw size={16} /> Take the podium again</button>
              </div>
              <div className="transcript">
                <div className="section-head"><span>THE TRANSCRIPT</span><small>ALL 09 RESPONSES</small></div>
                {allQuestions.map((item: GameQuestion, index) => <article className="transcript-entry" key={item.id}><div className="transcript-number"><span>0{index + 1}</span><b>{responses[index]?.breakdown.total}</b></div><div><h3>{item.prompt}</h3><p>“{responses[index]?.answer}”</p></div></article>)}
              </div>
            </div>
          </section>
        )}
      </div>
      <footer className="site-footer"><span>THE DAILY BRIEF <b>•</b> PRESS ROOM SIMULATOR</span><span>A LOCAL, PLAYFUL SCORING EXERCISE</span></footer>
    </main>
  );
}

function ScoreRow({ label, score, max, rationale }: { label: string; score: number; max: number; rationale: string }) {
  return <div className="score-row"><span>{label}<small>{rationale}</small></span><div className="score-bar"><i style={{ width: `${(score / max) * 100}%` }} /></div><b>{score}<small>/{max}</small></b></div>;
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
