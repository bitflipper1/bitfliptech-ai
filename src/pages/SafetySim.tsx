import { useState } from 'react'
import { Link } from 'react-router-dom'
import './SafetySim.css'

interface Choice {
  label: string
  next: string
  risky?: boolean
}

interface Node {
  copilot: string[]
  evidence?: string
  choices: Choice[]
  panel: Partial<Panel>
  terminal?: boolean
}

interface Panel {
  line: string
  interlock: string
  personnel: string
  loto: string
  estop: string
}

const START_PANEL: Panel = {
  line: 'STOPPED — jam',
  interlock: 'ENGAGED',
  personnel: '1 IN CELL (badge)',
  loto: 'NOT APPLIED',
  estop: 'READY',
}

const SCRIPT: Record<string, Node> = {
  alert: {
    copilot: [
      'Torque spike then jam signal on conveyor L4 during changeover. Motion halted by interlock — not by a person.',
      'Badge log shows R. Alvarez scanned into cell 4, gate B, 2 minutes before the jam. No scan-out.',
      'My read: probable manual jam-clear attempt in progress. I recommend verifying the cell before anything moves.',
    ],
    evidence: 'evidence: torque trace 09:41:12 · jam sensor J4-2 · badge log gate B',
    panel: {},
    choices: [
      { label: 'Verify cell status via camera 4B', next: 'camera' },
      { label: 'Restart the line remotely', next: 'refuse', risky: true },
      { label: 'Trigger area e-stop', next: 'estop' },
    ],
  },
  refuse: {
    copilot: [
      'Restart blocked. Personnel-in-cell interlock is active and I will not override a life-safety interlock — that authority stays with humans following the verified procedure.',
      'If the badge log is wrong, the fix is to verify, not to assume. Camera 4B is live.',
    ],
    evidence: 'design note: the copilot declines unsafe automation and says why',
    panel: {},
    choices: [
      { label: 'Verify cell status via camera 4B', next: 'camera' },
      { label: 'Trigger area e-stop', next: 'estop' },
    ],
  },
  estop: {
    copilot: [
      'Area e-stop fired. Line 4 and adjacent conveyors de-energized. That was a safe call — conservative, but safe.',
      'Camera 4B now shows Alvarez at the pinch point, reaching into the jam. No lockout tag on the isolator.',
    ],
    panel: { line: 'E-STOP — de-energized', estop: 'FIRED' },
    choices: [
      { label: 'Page Alvarez and the shift supervisor', next: 'page' },
      { label: 'Release e-stop and restart', next: 'refuse2', risky: true },
    ],
  },
  camera: {
    copilot: [
      'Camera 4B: Alvarez is at the pinch point clearing the jam by hand. The isolator shows NO lockout tag.',
      'This is the dangerous window — an untagged energized cell with a person inside it.',
    ],
    evidence: 'evidence: cam 4B still · isolator LI-4 state: closed, untagged',
    panel: {},
    choices: [
      { label: 'Page Alvarez and the shift supervisor', next: 'page' },
      { label: 'Open the gate release remotely', next: 'refuse2', risky: true },
    ],
  },
  refuse2: {
    copilot: [
      'Not while the cell reads occupied and untagged. That action needs two-person confirmation at the panel under your site procedure — I can queue the request, not perform it.',
      'Fastest safe path: contact the person in the cell.',
    ],
    evidence: 'design note: irreversible actions require human confirmation, always',
    panel: {},
    choices: [{ label: 'Page Alvarez and the shift supervisor', next: 'page' }],
  },
  page: {
    copilot: [
      'Alvarez responds: "Clearing the jam — forgot the tag, my mistake." Supervisor is en route to gate B.',
      'I can walk the lockout-tagout sequence with them step by step, and log this as a near-miss for the safety review.',
    ],
    panel: { personnel: '1 IN CELL — responding' },
    choices: [
      { label: 'Guide LOTO with Alvarez, log the near-miss', next: 'loto' },
      { label: 'Skip the paperwork, just clear the jam', next: 'refuse3', risky: true },
    ],
  },
  refuse3: {
    copilot: [
      'The log is not paperwork — it is how the next shift avoids this exact window. Recording it either way; that is not optional in my configuration.',
      'LOTO sequence is ready when you are.',
    ],
    panel: {},
    choices: [{ label: 'Guide LOTO with Alvarez', next: 'loto' }],
  },
  loto: {
    copilot: [
      'LOTO complete and verified: isolator open → lock applied → tag signed → zero-energy check passed. Jam cleared with the cell dead.',
      'Alvarez is out, gate B closed, cell reads clear. Pre-start checks are green. Restart is now yours to authorize — I do not start lines.',
    ],
    evidence: 'checklist: isolate ✓ lock ✓ tag ✓ verify zero energy ✓',
    panel: { loto: 'APPLIED + VERIFIED', personnel: 'CLEAR', line: 'READY — awaiting authorization' },
    choices: [{ label: 'AUTHORIZE RESTART — cell verified clear', next: 'debrief' }],
  },
  debrief: {
    copilot: ['Line 4 running. Elapsed: one incident, zero injuries, one near-miss properly logged.'],
    panel: { line: 'RUNNING', interlock: 'ARMED', estop: 'READY', personnel: 'CLEAR' },
    choices: [],
    terminal: true,
  },
}

export default function SafetySim() {
  const [nodeId, setNodeId] = useState('alert')
  const [panel, setPanel] = useState<Panel>(START_PANEL)
  const [transcript, setTranscript] = useState<string[][]>([SCRIPT.alert.copilot])
  const [riskyCalls, setRiskyCalls] = useState(0)
  const node = SCRIPT[nodeId]

  function choose(c: Choice) {
    const next = SCRIPT[c.next]
    if (c.risky) setRiskyCalls((n) => n + 1)
    setNodeId(c.next)
    setPanel((p) => ({ ...p, ...next.panel }))
    setTranscript((t) => [...t, next.copilot])
  }

  function restart() {
    setNodeId('alert')
    setPanel(START_PANEL)
    setTranscript([SCRIPT.alert.copilot])
    setRiskyCalls(0)
  }

  return (
    <main className="page-top sim">
      <section className="section">
        <div className="sim-head">
          <div>
            <p className="mono">
              <Link to="/lab" className="sim-back">← lab</Link> · scripted incident · interactive
            </p>
            <h2>Industrial Safety Copilot</h2>
            <p className="sim-sub">
              09:41, conveyor line 4, mid-changeover. You are the control-room operator; the
              copilot advises but <b>never overrides you — and never lets you override safety</b>.
            </p>
          </div>
        </div>

        <div className="safety-layout">
          <aside className="safety-panel" aria-label="Plant status">
            <p className="mono safety-panel-title">LINE 4 — STATUS</p>
            {(
              [
                ['line', 'line state'],
                ['interlock', 'interlock'],
                ['personnel', 'personnel'],
                ['loto', 'loto'],
                ['estop', 'e-stop'],
              ] as const
            ).map(([key, label]) => (
              <div key={key} className="safety-stat">
                <span className="mono">{label}</span>
                <b
                  className={`mono ${
                    /CLEAR|APPLIED|RUNNING|ARMED|READY —|READY$/.test(panel[key])
                      ? 'stat-ok'
                      : 'stat-warn'
                  }`}
                >
                  {panel[key]}
                </b>
              </div>
            ))}
            <p className="mono safety-risky">
              risky calls caught by copilot: <b>{riskyCalls}</b>
            </p>
          </aside>

          <div className="safety-chat">
            {transcript.map((turn, i) => (
              <div key={i} className="copilot-turn">
                <p className="mono copilot-name">◆ copilot</p>
                {turn.map((line) => (
                  <p key={line} className="copilot-line">{line}</p>
                ))}
              </div>
            ))}
            {node.evidence && <p className="mono copilot-evidence">{node.evidence}</p>}

            {!node.terminal ? (
              <div className="safety-choices">
                {node.choices.map((c) => (
                  <button
                    key={c.label}
                    className={`safety-choice mono ${c.risky ? 'safety-choice-risky' : ''}`}
                    onClick={() => choose(c)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="safety-debrief">
                <p className="mono safety-debrief-title">DEBRIEF</p>
                <ul>
                  <li>The copilot explained its reasoning and showed its evidence at every step.</li>
                  <li>
                    It refused unsafe automation {riskyCalls > 0 ? `${riskyCalls} time${riskyCalls > 1 ? 's' : ''}` : '— you never tried'} and said why.
                  </li>
                  <li>Irreversible actions stayed human-authorized. The AI never started the line.</li>
                  <li>The near-miss became a log entry, not a secret.</li>
                </ul>
                <div className="safety-debrief-cta">
                  <button className="btn btn-ghost mono" onClick={restart}>run it again</button>
                  <Link to="/contact" className="btn btn-solid mono">design this for your plant</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
