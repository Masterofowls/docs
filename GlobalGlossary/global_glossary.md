# Global Glossary

_Cross-stack · Interview reference_

---

## 📋 Overview

Alphabetical glossary of **500** terms used across web development, DevOps, databases, testing, security, and system design — useful for technical interviews and quick recall. One term, one line.

## 🔧 Core concepts

| # | Term | Definition |
| --- | --- | --- |
| 1 | ACID | Database transaction properties: Atomicity, Consistency, Isolation, Durability. |
| 2 | Accessibility (a11y) | Designing UIs usable by keyboard, screen readers, and assistive tech. |
| 3 | API | Application Programming Interface — contract for programs to talk to each other. |
| 4 | API Gateway | Single entry point that routes, auth-checks, and rate-limits backend services. |
| 5 | Artifact | Build output (binary, image, package) stored or deployed by CI/CD. |
| 6 | Async / Await | Non-blocking style: work pauses until I/O completes without blocking the thread. |
| 7 | Authentication | Proving who you are (login, token, certificate). |
| 8 | Authorization | What you are allowed to do after identity is known (roles, permissions). |
| 9 | BDD | Behavior-Driven Development — tests/specs written in human-readable scenarios. |
| 10 | Bearer token | HTTP auth scheme: Authorization: Bearer {token}. |
| 11 | Black-box testing | Testing behavior from outside without knowing internal implementation. |
| 12 | Blue-green deployment | Two identical envs; traffic switches from old (blue) to new (green). |
| 13 | Branch (Git) | Movable pointer to commits; isolates feature work. |
| 14 | Cache | Storing data closer to the consumer for faster repeat access. |
| 15 | Callback | Function passed to another function to run later on async completion. |
| 16 | Canary release | Roll out a change to a small % of users before full promotion. |
| 17 | CAP theorem | Distributed systems trade Consistency, Availability, Partition tolerance. |
| 18 | CDN | Content Delivery Network — edge caches for static assets and sometimes HTML. |
| 19 | Certificate (TLS) | Cryptographic document binding a public key to a domain identity. |
| 20 | CI/CD | Continuous Integration / Delivery / Deployment — automate build, test, ship. |
| 21 | Client-side rendering (CSR) | Browser runs JS to render UI after loading a shell page. |
| 22 | Closure | Function capturing variables from its surrounding lexical scope. |
| 23 | CNI | Container Network Interface — standard for wiring containers into networks. |
| 24 | Component (React) | Reusable UI unit receiving props and returning elements. |
| 25 | Connection pool | Reuses open DB connections instead of opening one per request. |
| 26 | Container | Lightweight isolated process with its own filesystem sharing the host kernel. |
| 27 | Content-Type | HTTP header declaring body format (e.g. application/json). |
| 28 | Context (React) | Share values down the tree without prop drilling at every level. |
| 29 | Continuous Delivery | Every change is releasable; prod deploy may be manual or gated. |
| 30 | Continuous Deployment | Every passing change auto-deploys to production. |
| 31 | Continuous Integration | Merge often; each push runs automated build and tests. |
| 32 | Cookie | Small key-value stored by the browser and sent with requests to a domain. |
| 33 | CORS | Cross-Origin Resource Sharing — browser rules for JS calling another origin. |
| 34 | CRUD | Create, Read, Update, Delete — basic data operations. |
| 35 | CSRF | Cross-Site Request Forgery — tricking a logged-in browser into unwanted actions. |
| 36 | CSS | Cascading Style Sheets — layout, color, typography, and motion for the web. |
| 37 | CSS Grid | Two-dimensional CSS layout with explicit rows and columns. |
| 38 | CSS Specificity | Rules deciding which selector wins when declarations conflict. |
| 39 | Data structure | Organized storage: array, hash map, tree, queue, graph, etc. |
| 40 | Deadlock | Tasks wait on each other forever and make no progress. |
| 41 | Dependency injection | Supply dependencies from outside instead of hard-coding in a class. |
| 42 | Deployment | Putting a built app onto infrastructure users can reach. |
| 43 | DevOps | Culture and tooling bridging development and operations. |
| 44 | DNS | Domain Name System — maps hostnames to IP addresses. |
| 45 | DOM | Document Object Model — tree representation of HTML the browser scripts. |
| 46 | Docker | Platform to build, ship, and run apps in containers from images. |
| 47 | Dockerfile | Recipe describing how to build a container image. |
| 48 | DRY | Don't Repeat Yourself — centralize shared logic instead of copying. |
| 49 | E2E test | End-to-end test — full user flow through real UI and often backends. |
| 50 | Encryption | Scrambling data so only key holders can read it. |
| 51 | Environment variable | Named config injected at runtime (secrets, URLs, flags). |
| 52 | Event loop | JS runtime scheduling callbacks, microtasks, and rendering. |
| 53 | Event-driven architecture | Services react to messages/events instead of sync calls. |
| 54 | EXPLAIN | SQL command showing how the database plans to execute a query. |
| 55 | Fixture (testing) | Reusable setup/teardown object or data for tests. |
| 56 | Flexbox | CSS one-dimensional layout along main/cross axis. |
| 57 | Foreign key | Column referencing a primary key in another table. |
| 58 | Functional programming | Style emphasizing pure functions, immutability, composition. |
| 59 | Garbage collection | Automatic reclaim of memory no longer reachable. |
| 60 | GraphQL | API style where clients request exact fields from one endpoint. |
| 61 | gRPC | High-performance RPC using HTTP/2 and often Protocol Buffers. |
| 62 | Hash / Hashing | One-way function mapping input to fixed-size digest. |
| 63 | Hook (React) | Function like useState/useEffect using React features in function components. |
| 64 | Horizontal scaling | Add more machines to handle load (scale out). |
| 65 | HTML | HyperText Markup Language — semantic structure of web documents. |
| 66 | HTTP | Hypertext Transfer Protocol — request/response protocol for the web. |
| 67 | HTTPS | HTTP over TLS — encrypted and authenticated web traffic. |
| 68 | Hydration | Attaching client JS handlers and state to server-rendered HTML. |
| 69 | Idempotent | Repeating an operation yields the same result (safe retries). |
| 70 | Image (Docker) | Immutable template for containers; layered and cached. |
| 71 | Immutable | Value that cannot change after creation — copy instead of mutate. |
| 72 | Index (DB) | Structure speeding lookups on columns at write/storage cost. |
| 73 | Infrastructure as Code (IaC) | Define servers/networks in versioned files. |
| 74 | Integration test | Tests several modules or services together. |
| 75 | ISR | Incremental Static Regeneration — rebuild static pages on schedule/demand. |
| 76 | JSON | JavaScript Object Notation — text format for structured API data. |
| 77 | JSON Web Token (JWT) | Compact signed token encoding claims for stateless auth. |
| 78 | Kubernetes (K8s) | Orchestrator scheduling, scaling, and healing containers. |
| 79 | Latency | Time delay between request and response. |
| 80 | Load balancer | Distributes traffic across servers for capacity and fault tolerance. |
| 81 | Middleware | Code between request and handler (logging, auth, parsing). |
| 82 | Microservices | Small independently deployable services with bounded contexts. |
| 83 | Migration (DB) | Versioned schema change applied in order across environments. |
| 84 | Mock (testing) | Test double replacing a dependency with controlled behavior. |
| 85 | Monolith | Single deployable application containing most business logic. |
| 86 | MVC | Model–View–Controller — separates data, UI, and request handling. |
| 87 | mTLS | Mutual TLS — both client and server present certificates. |
| 88 | NoSQL | Non-relational DB families: document, key-value, column, graph. |
| 89 | Normalization | Organizing relational tables to reduce redundancy. |
| 90 | OAuth 2.0 | Authorization framework delegating access via tokens without sharing passwords. |
| 91 | OIDC | OpenID Connect — identity layer on OAuth issuing ID tokens. |
| 92 | ORM | Object-Relational Mapper — maps tables/rows to application objects. |
| 93 | Pagination | Splitting large results into pages (offset/limit or cursor). |
| 94 | Primary key | Column(s) uniquely identifying each table row. |
| 95 | Promise | JS object representing eventual completion/failure of async work. |
| 96 | Prop (React) | Read-only input passed from parent to child component. |
| 97 | Protocol Buffer | Binary serialization format often used with gRPC. |
| 98 | Pub/Sub | Publish–subscribe messaging by topic. |
| 99 | Pull request (PR) | Proposal to merge a branch; triggers review and CI. |
| 100 | Query string | URL parameters after ? (e.g. ?q=python&page=2). |
| 101 | Queue | FIFO structure or broker decoupling producers and consumers. |
| 102 | Race condition | Outcome depends on unpredictable timing of concurrent ops. |
| 103 | Rate limiting | Cap requests per client/time window to protect availability. |
| 104 | React | Library for UIs from components and declarative state. |
| 105 | Redis | In-memory store for cache, sessions, pub/sub, and structures. |
| 106 | Regression test | Ensures previously fixed features still work after changes. |
| 107 | REST | HTTP APIs using resources, verbs, and status codes. |
| 108 | Reverse proxy | Server in front of apps terminating TLS and routing. |
| 109 | Rollback | Revert deployment to a known-good previous version. |
| 110 | Server-side rendering (SSR) | HTML generated on the server per request. |
| 111 | Serverless | Run functions on demand without managing servers yourself. |
| 112 | Session | State tracking a user across requests (server or signed client). |
| 113 | Sharding | Splitting data across DB instances by key range or hash. |
| 114 | Smoke test | Quick sanity check that critical paths work after deploy. |
| 115 | Snapshot test | Compare rendered output to a saved baseline file. |
| 116 | SOLID | OOP design principles: SRP, OCP, LSP, ISP, DIP. |
| 117 | SPA | Single Page App — client router swaps views without full reloads. |
| 118 | SQL | Structured Query Language for relational data. |
| 119 | SQL injection | Embedding SQL in user input; blocked by parameterized queries. |
| 120 | SSG | Static Site Generation — HTML built at build time. |
| 121 | SSL/TLS | Transport Layer Security — encrypts traffic and verifies identity. |
| 122 | State (React) | Component-owned data that triggers re-render when updated. |
| 123 | Stateless (HTTP) | Each request carries all context; no server session between calls. |
| 124 | Stub (testing) | Fake implementation returning canned responses. |
| 125 | TDD | Test-Driven Development — failing test first, then minimal code. |
| 126 | Technical debt | Shortcuts that speed now but cost maintenance later. |
| 127 | Throughput | Work completed per unit time (req/s, rows/s). |
| 128 | TLS | Transport Layer Security — modern encrypted transport (successor to SSL). |
| 129 | Transaction | DB operations that commit together or roll back on failure. |
| 130 | Tree-shaking | Bundler removing unused exports from the final JS bundle. |
| 131 | TypeScript | Typed superset of JavaScript compiling to plain JS. |
| 132 | Unit test | Tests one function/module in isolation with mocks. |
| 133 | Vertical scaling | Add CPU/RAM to one machine (scale up). |
| 134 | Virtual DOM | In-memory tree diffed to update the real DOM efficiently. |
| 135 | Webhook | HTTP callback when an external event happens. |
| 136 | WebSocket | Full-duplex persistent connection for real-time messaging. |
| 137 | White-box testing | Testing with knowledge of internal code paths. |
| 138 | XSS | Cross-Site Scripting — injecting scripts viewed by other users. |
| 139 | YAML | Human-readable data format common in CI and config. |
| 140 | Zero-downtime deploy | Ship without users seeing outage (rolling, blue-green). |
| 141 | ABI | Application Binary Interface — how compiled code calls libraries at machine level. |
| 142 | Abstract class | Class that cannot be instantiated; may define partial behavior for subclasses. |
| 143 | Acceptance test | Validates the system meets business/user requirements end-to-end. |
| 144 | ACK | TCP acknowledgment packet confirming receipt of data. |
| 145 | Active Record | ORM pattern where model objects wrap DB rows and know how to persist themselves. |
| 146 | Affinity (K8s) | Schedule pods onto specific nodes (node affinity / anti-affinity). |
| 147 | Aggregate (DDD) | Cluster of domain objects treated as one consistency boundary. |
| 148 | Agile | Iterative delivery with short cycles, feedback, and adaptive planning. |
| 149 | AJAX | Asynchronous JS + XML/JSON to update pages without full reloads. |
| 150 | Alerting | Notify humans/systems when metrics cross thresholds (PagerDuty, etc.). |
| 151 | Algorithm | Step-by-step procedure to solve a class of problems. |
| 152 | Alias (Git) | Friendly name pointing to a commit (often a branch or tag). |
| 153 | Amazon S3 | Object storage service — buckets of files with HTTP API. |
| 154 | AMD (modules) | Asynchronous Module Definition — legacy JS module format. |
| 155 | Amortized complexity | Average cost per operation over a sequence (e.g. dynamic array append). |
| 156 | Annotation (Java/TS) | Metadata attached to code read by frameworks or compilers. |
| 157 | Anonymous function | Function without a name — often inline or assigned to a variable. |
| 158 | Ansible | Agentless configuration management using SSH and YAML playbooks. |
| 159 | Anti-pattern | Common but counterproductive solution to a recurring problem. |
| 160 | API key | Static secret identifying a client to an API (rotate and scope carefully). |
| 161 | API versioning | Strategy to evolve APIs without breaking clients (/v1, headers, etc.). |
| 162 | APM | Application Performance Monitoring — traces, metrics, errors in production. |
| 163 | App Router (Next.js) | Next.js routing with layouts, RSC, and file-system routes under app/. |
| 164 | Application layer (OSI) | Layer 7 — HTTP, DNS, SMTP; what most devs interact with. |
| 165 | Argument (CLI) | Value passed to a command or flag on the shell. |
| 166 | Array | Ordered collection addressable by index. |
| 167 | Arrow function | JS concise function syntax with lexical this binding. |
| 168 | ASCII | 7-bit character encoding for English letters and symbols. |
| 169 | Aspect-oriented programming | Cross-cutting concerns (logging, auth) woven via aspects. |
| 170 | Assertion | Check that expected condition holds in a test. |
| 171 | Async I/O | Perform I/O without blocking the calling thread. |
| 172 | Atomic operation | Operation that completes entirely or not at all from other threads' view. |
| 173 | Attribute (HTML) | Name=value on an element modifying behavior or metadata. |
| 174 | Authentication header | HTTP header carrying credentials (Authorization, Cookie, etc.). |
| 175 | Auto-scaling | Automatically add/remove instances based on load metrics. |
| 176 | Availability zone | Isolated datacenter area within a cloud region for redundancy. |
| 177 | AVL tree | Self-balancing binary search tree maintaining height balance. |
| 178 | B-tree | Balanced tree structure common in database indexes. |
| 179 | Backpressure | Slowing producers when consumers cannot keep up. |
| 180 | Backward compatibility | New versions still work with old clients/data formats. |
| 181 | Bandwidth | Maximum data transfer rate of a link or service. |
| 182 | Base64 | Encoding binary data as ASCII text for transport in JSON/email. |
| 183 | Baseline (browser) | Reference browser list you support and test against. |
| 184 | Batch processing | Process large datasets in grouped jobs rather than per-request. |
| 185 | Benchmark | Timed measurement comparing performance of code or systems. |
| 186 | Big O notation | Upper bound on growth rate of time/space vs input size. |
| 187 | Binary search | Search sorted array by halving the range — O(log n). |
| 188 | Binary tree | Tree where each node has at most two children. |
| 189 | Binding (DNS) | Map hostname to IP or other records. |
| 190 | Bit | Smallest unit of data — 0 or 1. |
| 191 | Bitmask | Integer used as flags via bitwise AND/OR operations. |
| 192 | Blob storage | Store unstructured binary objects (images, backups) by key. |
| 193 | Block cipher | Encrypts fixed-size blocks (AES) vs stream ciphers. |
| 194 | Blocking call | Call that waits until operation completes before returning. |
| 195 | Bloom filter | Probabilistic set membership — may false-positive, never false-negative. |
| 196 | Blueprint (software) | Detailed design describing components before implementation. |
| 197 | Boolean | Logical true/false value type. |
| 198 | Bootstrapping | Starting a process from minimal initial resources (compiler, cluster). |
| 199 | Border-box (CSS) | width/height include padding and border, not just content. |
| 200 | Bounded context (DDD) | Explicit boundary where a domain model and language apply. |
| 201 | Box model (CSS) | Content, padding, border, margin layers of an element. |
| 202 | Breakpoint (CSS) | Media query width where layout rules change. |
| 203 | Breakpoint (debug) | Pause execution at a line to inspect state. |
| 204 | Broadcast (network) | Send packet to all hosts on a subnet. |
| 205 | Browser cache | Store assets locally to speed repeat visits. |
| 206 | Buffer | Temporary memory holding data during transfer or processing. |
| 207 | Buffer overflow | Writing past allocated memory — classic security bug. |
| 208 | Build cache | Reuse prior build outputs to speed CI (Docker layers, npm cache). |
| 209 | Bulkhead pattern | Isolate resources so failure in one pool cannot drain all. |
| 210 | Bundle (JS) | Packaged output combining modules for the browser. |
| 211 | Bytecode | Intermediate instructions VMs execute (JVM, CPython, WASM). |
| 212 | Cache invalidation | Remove or refresh stale cached entries when source changes. |
| 213 | Cache stampede | Many requests miss cache simultaneously and hammer origin. |
| 214 | Caching header | HTTP headers (Cache-Control, ETag) controlling CDN/browser cache. |
| 215 | Call stack | LIFO record of active function calls during execution. |
| 216 | CamelCase | Naming style joining words with capital letters (myVariable). |
| 217 | Canary analysis | Compare metrics between canary and baseline during rollout. |
| 218 | Cardinality | Number of distinct values in a set or metric label set. |
| 219 | Cascading (CSS) | How styles from multiple sources combine and inherit. |
| 220 | CDN cache hit | Response served from edge without reaching origin. |
| 221 | Cell (spreadsheet/table) | Single intersection of row and column. |
| 222 | Certificate pinning | App trusts only specific cert/public key, not whole CA chain. |
| 223 | Character encoding | Mapping bytes to characters (UTF-8, Latin-1). |
| 224 | Checksum | Hash-like value detecting accidental data corruption. |
| 225 | Cherry-pick (Git) | Apply a specific commit onto another branch. |
| 226 | Chunk (webpack) | Split bundle piece loaded on demand (code splitting). |
| 227 | Circuit breaker | Stop calling failing dependency until it recovers. |
| 228 | Class (OOP) | Blueprint for objects with fields and methods. |
| 229 | CLI | Command-Line Interface — text commands in a terminal. |
| 230 | Client certificate | TLS cert presented by client for mutual authentication. |
| 231 | Cloud region | Geographic area hosting cloud resources (us-east-1). |
| 232 | Cluster (K8s) | Group of nodes running container workloads. |
| 233 | CMS | Content Management System — edit site content without code deploys. |
| 234 | Code coverage | Percentage of source lines/branches executed by tests. |
| 235 | Code review | Peer inspection of changes before merge. |
| 236 | Code splitting | Load only JS needed for current route/feature. |
| 237 | Cohesion | How closely related responsibilities within a module are. |
| 238 | Cold start | Latency when spinning up new serverless/container instance from idle. |
| 239 | Column store | DB storing columns together — good for analytics scans. |
| 240 | Command pattern | Encapsulate request as object with execute/undo. |
| 241 | Commit (Git) | Snapshot of repository state with message and parent pointer. |
| 242 | Compile time | When source is translated to bytecode/binary before running. |
| 243 | Compiler | Translates entire program ahead of time (C, Rust, TS→JS). |
| 244 | Composite index | DB index on multiple columns together. |
| 245 | Composition (React) | Build UI by nesting components instead of inheritance. |
| 246 | Compression | Reduce bytes (gzip, brotli) for faster transfer. |
| 247 | Concurrency | Multiple tasks making progress (not necessarily parallel). |
| 248 | Conditional rendering | Show UI based on boolean state or props. |
| 249 | Config map (K8s) | Key-value config injected into pods as env or files. |
| 250 | Constructor | Function initializing a new object instance. |
| 251 | Container image registry | Store for images (Docker Hub, ECR, GHCR). |
| 252 | Content Security Policy (CSP) | HTTP header restricting script/style sources to reduce XSS. |
| 253 | Continuous profiling | Sample production CPU/memory to find hot paths. |
| 254 | Control flow | Order in which statements and branches execute. |
| 255 | Controlled component | Form input whose value is driven by React state. |
| 256 | Cookie attributes | HttpOnly, Secure, SameSite — control cookie behavior. |
| 257 | Copy-on-write | Share memory until a write forces a duplicate (fork, persistent DS). |
| 258 | Coroutine | Function that can suspend/resume cooperatively (async def, Go). |
| 259 | Coupling | Degree of dependency between modules — lower is often better. |
| 260 | CPU-bound | Work limited by processor speed, not I/O wait. |
| 261 | Crawler | Automated bot fetching pages (search engines, scrapers). |
| 262 | Credential stuffing | Attack reusing leaked passwords on many sites. |
| 263 | Cron | Time-based job scheduler syntax (minute hour day month weekday). |
| 264 | Cross-site cookie | Cookie sent on cross-origin requests — restricted by SameSite. |
| 265 | CRDT | Conflict-free Replicated Data Type — merge without coordination. |
| 266 | Cryptographic salt | Random data mixed into password hashing to defeat rainbow tables. |
| 267 | CSRF token | Unpredictable value proving form POST came from your site. |
| 268 | Cursor (DB) | Database iterator over query results row-by-row. |
| 269 | Cursor pagination | Page using opaque cursor token instead of OFFSET. |
| 270 | Daemon process | Background service not tied to an interactive terminal. |
| 271 | Dark launch | Ship code to prod disabled or internal-only before user exposure. |
| 272 | Data class | Class mainly holding data with generated boilerplate (Python @dataclass). |
| 273 | Data lake | Large store of raw structured/unstructured data for analytics. |
| 274 | Data warehouse | Optimized analytical DB for reporting (Snowflake, BigQuery). |
| 275 | Database replica | Read-only copy of primary for scaling reads. |
| 276 | Database view | Saved query acting like a virtual table. |
| 277 | Debounce | Wait until events stop firing before acting (search input). |
| 278 | Decoupling | Reduce direct dependencies between components. |
| 279 | Default export | Module's primary export (one per ES module file). |
| 280 | Defensive programming | Validate inputs and fail safely anticipating misuse. |
| 281 | Delegation | Forward work to another object instead of doing it yourself. |
| 282 | Denormalization | Duplicate data in DB to speed reads at cost of write complexity. |
| 283 | Dependency | External library or service your code relies on. |
| 284 | Dependency graph | Directed graph of package/module dependencies. |
| 285 | Deployment pipeline | Automated stages from commit to production. |
| 286 | Deprecation | Mark API/feature as scheduled for removal; warn callers. |
| 287 | Descriptor (Python) | Object defining __get__/__set__ controlling attribute access. |
| 288 | Design pattern | Reusable solution to a recurring design problem. |
| 289 | Destructuring | Unpack object/array fields into variables in one statement. |
| 290 | Dev container | Development environment defined as a container spec. |
| 291 | DevSecOps | Integrate security checks into dev and CI workflows. |
| 292 | DHCP | Protocol assigning IP addresses automatically on a network. |
| 293 | Diff (Git) | Line-by-line comparison between commits or files. |
| 294 | Digest (HTTP) | Hash of body used for integrity (Content-Digest). |
| 295 | Digital signature | Cryptographic proof that data came from holder of private key. |
| 296 | Dijkstra algorithm | Shortest path in weighted graph with non-negative edges. |
| 297 | Directory traversal | Attack accessing files outside intended path via ../ sequences. |
| 298 | Dirty read | Reading uncommitted data from another transaction. |
| 299 | Distributed lock | Coordinate exclusive access across multiple nodes (Redis, etcd). |
| 300 | Distributed tracing | Follow one request across services with trace/span IDs. |
| 301 | DNS propagation | Time for DNS record changes to spread globally. |
| 302 | Docker Compose | YAML defining multi-container apps for local/dev. |
| 303 | Docker layer | Immutable filesystem diff stacked into an image. |
| 304 | Document store | NoSQL DB storing JSON-like documents (MongoDB). |
| 305 | Domain name | Human-readable hostname (example.com). |
| 306 | Double dispatch | Method chosen based on runtime types of two objects. |
| 307 | Downtime | Period when service is unavailable to users. |
| 308 | Dynamo-style DB | Highly available key-value store with eventual consistency (DynamoDB). |
| 309 | Edge computing | Run logic near users/devices instead of central datacenter. |
| 310 | Edge function | Serverless function at CDN edge for low latency. |
| 311 | ElasticSearch | Search/analytics engine built on inverted indexes. |
| 312 | Element (DOM) | Node representing an HTML tag in the document tree. |
| 313 | Encapsulation | Hide internal state; expose behavior via public interface. |
| 314 | Entity (DDD) | Object with identity persisting over time (User, Order). |
| 315 | Enum | Type or construct for fixed set of named constants. |
| 316 | Ephemeral container | Temporary debug container attached to a pod. |
| 317 | Ephemeral storage | Non-persistent disk in containers/pods — lost on restart. |
| 318 | Error boundary (React) | Component catching render errors in child tree. |
| 319 | ES modules | Standard JS import/export module system (import/export). |
| 320 | Escape hatch | API to break abstraction when special case requires it. |
| 321 | ETag | HTTP validator token for conditional GET and cache revalidation. |
| 322 | Event bubbling | DOM events propagate from target up to ancestors. |
| 323 | Event capturing | DOM events propagate from root down to target. |
| 324 | Event sourcing | Store state changes as append-only event log. |
| 325 | Eventually consistent | Replicas converge over time; reads may be stale briefly. |
| 326 | Exception | Object thrown to signal error and unwind stack. |
| 327 | Exponential backoff | Retry delays grow exponentially to reduce load on failures. |
| 328 | Export (module) | Expose bindings from a module to importers. |
| 329 | Express.js | Minimal Node.js web framework for HTTP APIs. |
| 330 | Extension method | Add methods to existing types without modifying source (Kotlin, C#). |
| 331 | Failover | Automatically switch to backup when primary fails. |
| 332 | Fallback | Alternative path when primary option fails (fonts, CDN). |
| 333 | Fan-out | One producer sends to many consumers. |
| 334 | Fan-in | Many producers send to one consumer/aggregator. |
| 335 | Fastify | Fast Node.js web framework with schema-based validation. |
| 336 | Feature flag | Toggle behavior at runtime without redeploying code. |
| 337 | Feature branch | Short-lived branch for one feature or fix. |
| 338 | Federal Identity | Government/regulated identity standards (less common in web dev). |
| 339 | Fiber (React) | Reconciliation engine enabling incremental rendering and priorities. |
| 340 | FIFO | First In, First Out — queue discipline. |
| 341 | File descriptor | OS handle representing open file, socket, or pipe. |
| 342 | Filter (CSS) | Visual effects like blur/brightness on elements. |
| 343 | Finalizer | Cleanup hook when object is garbage-collected (avoid for resources). |
| 344 | Firewall | Network rules allowing/denying traffic by port/IP. |
| 345 | First-class function | Functions treated as values — passed and returned freely. |
| 346 | Fixed-point arithmetic | Decimal math without floating rounding errors. |
| 347 | Flaky test | Test that intermittently fails without code changes. |
| 348 | Flash storage | SSD/NVMe — fast non-volatile storage. |
| 349 | Floating point | IEEE format approximating real numbers — beware rounding. |
| 350 | Fluent interface | Method chaining returning this for readable APIs. |
| 351 | Fuzz testing | Random/mutated inputs to find crashes and edge cases. |
| 352 | Garbage collection pause | Stop-the-world interval while GC runs. |
| 353 | Gateway (API) | See API Gateway — entry point for microservices. |
| 354 | Generics | Type parameters letting code work across types safely. |
| 355 | Git fetch | Download remote commits without merging into local branch. |
| 356 | Git merge | Combine branch histories creating merge commit if needed. |
| 357 | Git rebase | Replay commits onto new base for linear history. |
| 358 | Git stash | Temporarily shelve uncommitted changes. |
| 359 | Git tag | Immutable pointer to a release commit. |
| 360 | GitHub Actions | CI/CD workflows triggered by GitHub events. |
| 361 | GitOps | Git as source of truth; automation syncs cluster to repo state. |
| 362 | Global scope | Variables visible everywhere in a script (avoid polluting). |
| 363 | Global variable | Variable accessible across entire program — tight coupling risk. |
| 364 | Graceful shutdown | Finish in-flight work and close connections before exit. |
| 365 | Graph (data structure) | Nodes and edges modeling relationships. |
| 366 | Graph database | Store optimized for traversing relationships (Neo4j). |
| 367 | Greedy algorithm | Pick locally best choice hoping for global optimum. |
| 368 | Grid (CSS) | See CSS Grid — 2D layout system. |
| 369 | Guard clause | Early return on invalid conditions to reduce nesting. |
| 370 | GUI | Graphical User Interface — windows, buttons, mouse-driven. |
| 371 | Gzip | Compression algorithm common for HTTP responses. |
| 372 | Handshake (TLS) | Negotiate cipher suite and keys before encrypted data. |
| 373 | Hard link | Directory entry pointing to same inode as another name. |
| 374 | Hash collision | Two inputs producing same hash — rare but possible. |
| 375 | Hash map | Key-value structure with O(1) average lookup via hashing. |
| 376 | Hash table | See hash map — array of buckets with collision handling. |
| 377 | Headless CMS | Content API without bundled frontend (Contentful, Sanity). |
| 378 | Headless component | UI logic without styles — bring your own CSS. |
| 379 | Health check | Endpoint or probe reporting if service is alive/ready. |
| 380 | Heap (memory) | Region for dynamic allocation (malloc/new). |
| 381 | Heap (data structure) | Priority queue — min/max element at root. |
| 382 | Helm chart | Packaged K8s manifests with templated values. |
| 383 | Hexadecimal | Base-16 numbering (0-9, A-F) common for colors and bytes. |
| 384 | Hidden class (JS engine) | V8 internal shape optimization for object layouts. |
| 385 | HMAC | Hash-based Message Authentication Code — integrity + secret. |
| 386 | Hoisting (JS) | Declarations moved to top of scope during compilation. |
| 387 | Hot reload | Apply code changes without full app restart (dev UX). |
| 388 | Hot path | Code executed most frequently — optimize here first. |
| 389 | HTTP/2 | Multiplexed streams, header compression, binary framing. |
| 390 | HTTP/3 | HTTP over QUIC (UDP) — faster connection setup. |
| 391 | HTTP method | Verb: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS. |
| 392 | HTTP status code | 3-digit result: 2xx success, 4xx client error, 5xx server. |
| 393 | Hub (React Native) | Central native module bridge for RN apps. |
| 394 | Hypervisor | Software running VMs (KVM, Hyper-V) or managing containers. |
| 395 | I/O bound | Work limited by disk/network latency, not CPU. |
| 396 | IaaS | Infrastructure as a Service — VMs, networks, raw compute (EC2). |
| 397 | Idempotency key | Client token ensuring retried POST does not duplicate side effects. |
| 398 | Idempotent consumer | Message handler safe if same message delivered twice. |
| 399 | IDE | Integrated Development Environment — editor + debugger + tools. |
| 400 | Immutable infrastructure | Replace servers instead of patching in place. |
| 401 | Import (module) | Load bindings exported from another module. |
| 402 | In-memory database | Data lives in RAM — fast, often non-durable (Redis). |
| 403 | Inbound rule | Firewall/security group allowing incoming traffic. |
| 404 | Incident response | Process to detect, mitigate, and learn from outages. |
| 405 | IndexedDB | Browser key-value store for large structured client data. |
| 406 | Inference | Run trained ML model to produce predictions. |
| 407 | Inheritance (OOP) | Subclass acquires fields/methods from parent class. |
| 408 | Ingress (K8s) | Routes external HTTP/S traffic into cluster services. |
| 409 | Injection attack | Insert malicious input interpreted as code (SQL, XSS, command). |
| 410 | Inline style | CSS declared on element style attribute — high specificity. |
| 411 | Inner join | SQL join returning rows with matching keys in both tables. |
| 412 | Input validation | Reject malformed data at boundary before processing. |
| 413 | Instance (cloud) | Virtual machine or container running your workload. |
| 414 | Integer overflow | Result exceeds representable range wrapping or erroring. |
| 415 | Interface (OOP/TS) | Contract listing methods a type must implement. |
| 416 | Interface segregation | SOLID: many specific interfaces beat one fat interface. |
| 417 | Interpreter | Executes source line-by-line (Python, Ruby shell). |
| 418 | Inversion of control | Framework calls your code (callbacks, DI containers). |
| 419 | Inverted index | Map from term to documents containing it — core of search engines. |
| 420 | IP address | Numeric host identifier (IPv4 32-bit, IPv6 128-bit). |
| 421 | IPv6 | 128-bit addresses solving IPv4 exhaustion. |
| 422 | ISO 8601 | Standard date/time string format (2026-07-11T13:00:00Z). |
| 423 | Isolation level | SQL transaction visibility rules (READ COMMITTED, SERIALIZABLE). |
| 424 | Issue tracker | System for bugs/tasks (Jira, GitHub Issues). |
| 425 | Iterable | Object producing sequence via __iter__ or Symbol.iterator. |
| 426 | Iterator | Object with next() yielding items until done. |
| 427 | Jenkins | Self-hosted CI server with plugins and pipelines. |
| 428 | Jitter | Randomness added to retry/backoff to prevent thundering herd. |
| 429 | Job queue | Workers pull tasks from queue (Sidekiq, Celery, Bull). |
| 430 | Join (SQL) | Combine rows from tables on related keys. |
| 431 | JPEG | Lossy image compression common for photos. |
| 432 | JSON Schema | Vocabulary validating JSON document structure. |
| 433 | JSONB | Postgres binary JSON with indexing and efficient storage. |
| 434 | JVM | Java Virtual Machine — runs bytecode with GC and JIT. |
| 435 | JWT refresh token | Long-lived token used only to obtain new access tokens. |
| 436 | K-nearest neighbors | ML classification by majority vote of closest training points. |
| 437 | Kafka | Distributed log/stream platform for high-throughput events. |
| 438 | Key-value store | DB indexed by single key (Redis, DynamoDB). |
| 439 | Kubernetes Deployment | Declarative desired state for ReplicaSets and rolling updates. |
| 440 | Kubernetes Namespace | Virtual cluster partition for resources and quotas. |
| 441 | Kubernetes Pod | Smallest deployable unit — one or more containers sharing network. |
| 442 | Kubernetes Service | Stable virtual IP/DNS load-balancing to pods. |
| 443 | Lambda (AWS) | Serverless function service triggered by events. |
| 444 | Lambda (functional) | Anonymous inline function (Python lambda, JS arrow). |
| 445 | Latency p99 | 99th percentile response time — tail latency metric. |
| 446 | Layer (network) | OSI/TCP-IP abstraction level (link, network, transport, app). |
| 447 | Lazy evaluation | Compute value only when first needed (generators, Suspense). |
| 448 | Lazy loading | Load resource (image, route) when it enters viewport or route. |
| 449 | Leader election | Pick one coordinator node in distributed system. |
| 450 | Leaf node | Tree node with no children. |
| 451 | Legacy code | Existing system hard to change but still in production. |
| 452 | Lighthouse | Chrome tool auditing performance, a11y, SEO, PWA. |
| 453 | LIFO | Last In, First Out — stack discipline. |
| 454 | Lift (SQL) | Apply function to every row/column without explicit loop. |
| 455 | Lighthouse score | 0–100 ratings from automated web audits. |
| 456 | Linter | Static analyzer flagging style and likely bugs (ESLint, Ruff). |
| 457 | Linked list | Nodes pointing to next — O(1) insert, O(n) index access. |
| 458 | Linkerd | Service mesh providing mTLS, metrics, retries for microservices. |
| 459 | Lint-staged | Run linters only on staged git files in pre-commit. |
| 460 | Linux namespace | Kernel isolation for PID, network, mount (container basis). |
| 461 | Load shedding | Drop/defer requests when overloaded to protect core service. |
| 462 | LocalStorage | Browser persistent key-value storage per origin. |
| 463 | Lock (mutex) | Ensure only one thread enters critical section. |
| 464 | Log aggregation | Centralize logs from many hosts (ELK, Loki). |
| 465 | Log level | Severity filter: debug, info, warn, error. |
| 466 | Log rotation | Archive and truncate logs so disks do not fill. |
| 467 | Logging | Record events with context for debugging and audit. |
| 468 | Long polling | HTTP request held open until server has data to push. |
| 469 | Loose coupling | Components interact via stable interfaces, not internals. |
| 470 | LSP (Liskov) | Subtypes must be substitutable for base types without surprises. |
| 471 | LTS | Long-Term Support release with extended security fixes. |
| 472 | Machine learning | Models learned from data rather than explicit rules. |
| 473 | Macro (Rust/C) | Compile-time code generation or text substitution. |
| 474 | Manifest (PWA) | JSON describing app name, icons, start URL for install. |
| 475 | Map (data structure) | Associative array — keys to values (dict, Map, object). |
| 476 | Markdown | Lightweight plain-text formatting (headings, lists, code fences). |
| 477 | Marshalling | Convert in-memory data to wire format (JSON, protobuf). |
| 478 | Memory leak | Memory never freed — usage grows until crash. |
| 479 | Memoization | Cache function results keyed by arguments. |
| 480 | Merge conflict | Git cannot auto-merge overlapping edits — manual resolution. |
| 481 | Message broker | Middleware routing messages between producers/consumers. |
| 482 | Message queue | Async buffer decoupling senders and receivers. |
| 483 | Metadata | Data about data — tags, headers, schema info. |
| 484 | Method overloading | Same method name, different parameter lists (Java, C#). |
| 485 | Method overriding | Subclass replaces parent method implementation. |
| 486 | Metric | Numeric measurement over time (CPU, RPS, error rate). |
| 487 | Microtask | High-priority JS task after current stack (Promise callbacks). |
| 488 | Middleware (Express) | Function (req,res,next) in request pipeline. |
| 489 | MIME type | Media type label (text/html, image/png). |
| 490 | Minification | Remove whitespace and shorten names in JS/CSS for size. |
| 491 | Mirror (Git) | Copy of remote repo hosted elsewhere (GitHub mirror). |
| 492 | MitM attack | Man-in-the-Middle — intercept traffic between parties. |
| 493 | Mixin | Class/module providing reusable methods to multiple classes. |
| 494 | Module bundler | Tool packing modules for browser (webpack, Vite, esbuild). |
| 495 | Module federation | Share JS modules across independently deployed apps. |
| 496 | Monorepo | Single repository containing multiple packages/services. |
| 497 | Monte Carlo | Random sampling method for estimation/simulation. |
| 498 | Mount (React) | Attach component to DOM and run effects first time. |
| 499 | Multi-factor auth (MFA) | Require two+ proof factors (password + TOTP). |
| 500 | Multi-tenancy | One app instance serves isolated customers (tenants). |

## 💡 Examples

**Quick recall drill — define in one sentence:**

1. **JWT** — Signed token carrying claims so APIs can authenticate without server session storage.
2. **ORM** — Maps DB tables to objects so you query with code instead of raw SQL everywhere.
3. **Black-box testing** — Verify outputs for inputs without inspecting source implementation.
4. **CI/CD** — Automate build/test on every change and promote passing artifacts to environments.
5. **Circuit breaker** — Stop calling a failing dependency until it recovers, preventing cascade failures.

**Interview follow-ups:**

- TLS vs HTTPS vs mTLS
- Unit vs integration vs E2E vs smoke
- REST vs GraphQL trade-offs
- SSR vs SSG vs CSR vs ISR
- OAuth vs session cookie vs JWT
- CAP vs PACELC for distributed databases

## ⚠️ Pitfalls

- Confusing **authentication** (who) with **authorization** (what they may do).
- Saying JWT is “more secure” than sessions — depends on storage, expiry, and rotation.
- Treating **CI** and **CD** as the same — integration vs delivery vs deployment differ.
- **Black-box** does not mean “no tests of internals ever” — choose level by risk.
- Memorizing **500 terms** without examples — pair each with one real project use case.

## 🔗 Related

- Per-topic glossaries under each stack (Python, Docker, React, etc.)
- [Comparisons](../Comparisons/README.md) — A vs B trade-off notes
- [Coverage](/docs/coverage) — which topics have glossary pages
