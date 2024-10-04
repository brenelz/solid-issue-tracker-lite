export const fakeIssues = [
    {
        title: 'Dashboard not loading data',
        description: 'The dashboard page is not displaying any data after a fetch request failure.',
        stacktrace: `import { createEffect, createResource } from "solid-js";

const fetchData = async () => {
  const res = await fetch('/api/data');
  return res.json();
};

function Dashboard() {
  const [data] = createResource(fetchData);

  return (
    <div>
      {data() ? <div>{JSON.stringify(data())}</div> : <div>Loading...</div>}
    </div>
  );
}`,
    },
    {
        title: '404 error on settings page',
        description: 'The settings page returns a 404 error after the last routing update.',
        stacktrace: `import { createSignal } from "solid-js";
import { Route, Routes } from "solid-app-router";

function App() {
  return (
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/settings" component={Settings} />
    </Routes>
  );
}

function Home() {
  return <div>Home Page</div>;
}

function Settings() {
  return <div>Settings Page</div>;
}`,
    },
    {
        title: 'Performance degradation on profile page',
        description: 'The profile page has high memory usage when users upload large files.',
        stacktrace: `import { createSignal } from "solid-js";

function Profile() {
  const [file, setFile] = createSignal(null);

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {file() && <p>File selected: {file().name}</p>}
    </div>
  );
}`,
    },
    {
        title: 'CSS not applying in dark mode',
        description: 'Styles do not change when switching to dark mode in the user settings.',
        stacktrace: `import { createSignal } from "solid-js";

function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = createSignal(false);

  return (
    <div class={isDarkMode() ? "dark" : "light"}>
      <button onClick={() => setIsDarkMode(!isDarkMode())}>
        Toggle Dark Mode
      </button>
    </div>
  );
}`,
    },
    {
        title: 'Session timeout not working',
        description: 'The session does not expire after the inactivity period, allowing users to stay logged in indefinitely.',
        stacktrace: `import { createEffect, createSignal } from "solid-js";

function SessionTimeout() {
  const [timeLeft, setTimeLeft] = createSignal(300); // 5 minutes

  createEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    if (timeLeft() <= 0) {
      clearInterval(timer);
      // handle session expiration
    }

    return () => clearInterval(timer);
  });

  return <div>Time left: {timeLeft()} seconds</div>;
}`,
    },
    {
        title: 'Dropdown menu not closing after selection',
        description: 'The dropdown menu stays open after an item is selected, causing a UX issue.',
        stacktrace: `import { createSignal } from "solid-js";

function Dropdown() {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen())}>
        Toggle Menu
      </button>
      {isOpen() && (
        <ul>
          <li onClick={() => setIsOpen(false)}>Option 1</li>
          <li onClick={() => setIsOpen(false)}>Option 2</li>
        </ul>
      )}
    </div>
  );
}`,
    },
    {
        title: 'Form validation not working',
        description: 'The form allows submission with empty fields, bypassing the required validation.',
        stacktrace: `import { createSignal } from "solid-js";

function Form() {
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name() && email()) {
      // submit form
    } else {
      alert("All fields are required");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name()}
        onInput={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email()}
        onInput={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}`,
    },
    {
        title: 'Search functionality returning incorrect results',
        description: 'The search bar returns irrelevant or incorrect results when querying for users.',
        stacktrace: `import { createSignal } from "solid-js";

function Search() {
  const [query, setQuery] = createSignal("");
  const [results, setResults] = createSignal([]);

  const handleSearch = async () => {
    const res = await fetch(\`/api/search?query=\${query()}\`);
    setResults(await res.json());
  };

  return (
    <div>
      <input
        type="text"
        value={query()}
        onInput={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results().map((result) => (
          <li>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}`,
    },
    {
        title: 'Notifications not displaying in real-time',
        description: 'Users are not receiving notifications in real-time, causing delays in updates.',
        stacktrace: `import { createSignal, onCleanup } from "solid-js";

function Notifications() {
  const [notifications, setNotifications] = createSignal([]);

  const connectWebSocket = () => {
    const ws = new WebSocket("wss://example.com/notifications");
    ws.onmessage = (event) => {
      setNotifications((prev) => [...prev, JSON.parse(event.data)]);
    };
    onCleanup(() => ws.close());
  };

  return (
    <div>
      <button onClick={connectWebSocket}>Connect</button>
      <ul>
        {notifications().map((notification) => (
          <li>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
}`,
    },
    {
        title: 'Mobile menu not collapsing',
        description: 'On mobile devices, the menu does not collapse when an item is selected.',
        stacktrace: `import { createSignal } from "solid-js";
    function MobileMenu() {
      const [isOpen, setIsOpen] = createSignal(false);
      return (
        <div>
          <button onClick={() => setIsOpen(!isOpen())}>Toggle Menu</button>
          {isOpen() && <ul><li onClick={() => setIsOpen(false)}>Home</li></ul>}
        </div>
      );
    }`,
    },
    {
        title: 'Unexpected token error during build',
        description: 'Build process fails with an "unexpected token" error after upgrading to the latest version of the bundler.',
        stacktrace: `import { createEffect } from "solid-js";
    function Component() {
      createEffect(() => {
        console.log("Effect running");
      });
      return <div>Component with effects</div>;
    }`,
    },
    {
        title: 'Tooltip not displaying on hover',
        description: 'Tooltips do not appear when hovering over buttons on the settings page.',
        stacktrace: `import { createSignal } from "solid-js";
    function TooltipButton() {
      const [isHovered, setIsHovered] = createSignal(false);
      return (
        <button onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          Hover me
          {isHovered() && <span class="tooltip">Tooltip text</span>}
        </button>
      );
    }`,
    },
    {
        title: 'File upload not triggering validation',
        description: 'The file upload does not trigger validation, allowing unsupported file types to be uploaded.',
        stacktrace: `import { createSignal } from "solid-js";
    function FileUpload() {
      const [file, setFile] = createSignal(null);
      const validateFile = (file) => file && file.size < 5000000;
      const handleUpload = (e) => {
        const selectedFile = e.target.files[0];
        if (validateFile(selectedFile)) {
          setFile(selectedFile);
        } else {
          alert("Invalid file");
        }
      };
      return <input type="file" onChange={handleUpload} />;
    }`,
    },
    {
        title: 'Comments section not updating after submission',
        description: 'New comments are not visible after submission until the page is manually refreshed.',
        stacktrace: `import { createSignal } from "solid-js";
    function Comments() {
      const [comments, setComments] = createSignal([]);
      const handleComment = (comment) => {
        setComments([...comments(), comment]);
      };
      return (
        <div>
          <input type="text" placeholder="Add comment" onKeyUp={(e) => {
            if (e.key === 'Enter') handleComment(e.target.value);
          }} />
          <ul>{comments().map(comment => <li>{comment}</li>)}</ul>
        </div>
      );
    }`,
    },
    {
        title: 'Graph rendering incorrectly on Firefox',
        description: 'The graph component is distorted when viewed on Firefox, but works fine on other browsers.',
        stacktrace: `import { createEffect, createSignal } from "solid-js";
    function Graph() {
      const [data] = createSignal([10, 20, 30]);
      createEffect(() => {
        // rendering graph logic here
      });
      return <canvas id="graph"></canvas>;
    }`,
    },
    {
        title: 'Text input cursor jumping to end',
        description: 'When editing text in the input field, the cursor jumps to the end on every keystroke.',
        stacktrace: `import { createSignal } from "solid-js";
    function TextInput() {
      const [text, setText] = createSignal("");
      return <input value={text()} onInput={(e) => setText(e.target.value)} />;
    }`,
    },
    {
        title: 'Notification count not resetting',
        description: 'The notification count badge does not reset after viewing all notifications.',
        stacktrace: `import { createSignal } from "solid-js";
    function NotificationBadge() {
      const [count, setCount] = createSignal(5);
      const clearNotifications = () => setCount(0);
      return (
        <div>
          <span>{count()} notifications</span>
          <button onClick={clearNotifications}>Clear</button>
        </div>
      );
    }`,
    },
    {
        title: 'Autocomplete suggestions not filtering correctly',
        description: 'The autocomplete field shows all options regardless of the input, instead of filtering the list.',
        stacktrace: `import { createSignal } from "solid-js";
    function Autocomplete() {
      const [query, setQuery] = createSignal("");
      const options = ["Apple", "Banana", "Cherry"];
      const filteredOptions = options.filter(option => option.toLowerCase().includes(query().toLowerCase()));
      return (
        <div>
          <input value={query()} onInput={(e) => setQuery(e.target.value)} placeholder="Type to search..." />
          <ul>{filteredOptions.map(option => <li>{option}</li>)}</ul>
        </div>
      );
    }`,
    },
    {
        title: 'Error boundary not catching all exceptions',
        description: 'Certain types of errors are not caught by the error boundary, leading to crashes.',
        stacktrace: `import { ErrorBoundary } from "solid-js";
    function App() {
      return (
        <ErrorBoundary fallback={<div>Error occurred</div>}>
          <MyComponent />
        </ErrorBoundary>
      );
    }
    function MyComponent() {
      throw new Error("Oops!");
    }`,
    },
    {
        title: 'Sidebar not expanding on hover',
        description: 'The sidebar does not expand when hovering over collapsed menu items.',
        stacktrace: `import { createSignal } from "solid-js";
    function Sidebar() {
      const [isExpanded, setIsExpanded] = createSignal(false);
      return (
        <div onMouseEnter={() => setIsExpanded(true)} onMouseLeave={() => setIsExpanded(false)}>
          {isExpanded() ? <div>Expanded Menu</div> : <div>Collapsed Menu</div>}
        </div>
      );
    }`,
    },
    {
        title: 'Password reset link expired too soon',
        description: 'The password reset link is expiring before the user has a chance to reset their password.',
        stacktrace: `import { createSignal } from "solid-js";
    function PasswordReset() {
      const [expired, setExpired] = createSignal(false);
      createEffect(() => {
        const timer = setTimeout(() => setExpired(true), 300000); // 5 minutes
        return () => clearTimeout(timer);
      });
      return expired() ? <div>Link expired</div> : <div>Password Reset Form</div>;
    }`,
    },
    {
        title: 'Video playback controls not visible',
        description: 'Users cannot see playback controls when watching videos in fullscreen mode.',
        stacktrace: `import { createSignal } from "solid-js";
    function VideoPlayer() {
      const [isFullscreen, setIsFullscreen] = createSignal(false);
      return (
        <div>
          <video controls={isFullscreen()} src="video.mp4"></video>
          <button onClick={() => setIsFullscreen(!isFullscreen())}>Toggle Fullscreen</button>
        </div>
      );
    }`,
    },
    {
        title: 'Data grid column resizing broken',
        description: 'Users are unable to resize columns in the data grid after a recent update.',
        stacktrace: `import { createSignal } from "solid-js";
    function DataGrid() {
      const [columns, setColumns] = createSignal([{ width: 100 }, { width: 200 }]);
      const handleResize = (index, newWidth) => {
        setColumns(columns().map((col, i) => (i === index ? { ...col, width: newWidth } : col)));
      };
      return <div>{columns().map(col => <div style={{ width: col.width }}>Column</div>)}</div>;
    }`,
    },
    {
        title: 'Form submission button disabled incorrectly',
        description: 'The submit button remains disabled even after all required fields are filled out.',
        stacktrace: `import { createSignal } from "solid-js";
    function Form() {
      const [name, setName] = createSignal("");
      const [email, setEmail] = createSignal("");
      const isDisabled = !name() || !email();
      return (
        <form>
          <input type="text" value={name()} onInput={(e) => setName(e.target.value)} placeholder="Name" />
          <input type="email" value={email()} onInput={(e) => setEmail(e.target.value)} placeholder="Email" />
          <button disabled={isDisabled}>Submit</button>
        </form>
      );
    }`,
    },
    {
        title: 'Loading spinner not disappearing after content loads',
        description: 'The loading spinner remains visible even after content has fully loaded.',
        stacktrace: `import { createSignal, createResource } from "solid-js";
    const fetchData = async () => {
      const res = await fetch('/api/content');
      return res.json();
    };
    function ContentLoader() {
      const [data] = createResource(fetchData);
      return <div>{data() ? <div>Content Loaded</div> : <div class="spinner">Loading...</div>}</div>;
    }`,
    },
    {
        title: 'API requests failing with CORS error',
        description: 'API requests are being blocked due to Cross-Origin Resource Sharing (CORS) policy violations.',
        stacktrace: `import { createResource } from "solid-js";
    const fetchData = async () => {
      try {
        const res = await fetch('https://example.com/api/data', { credentials: 'include' });
        return await res.json();
      } catch (error) {
        console.error('CORS error:', error);
      }
    };
    function DataFetcher() {
      const [data] = createResource(fetchData);
      return <div>{data() ? JSON.stringify(data()) : 'Failed to load data'}</div>;
    }`,
    },
    {
        title: 'Image carousel not looping correctly',
        description: 'The image carousel stops after the last image instead of looping back to the first.',
        stacktrace: `import { createSignal, onCleanup } from "solid-js";
    function ImageCarousel() {
      const [index, setIndex] = createSignal(0);
      const images = ["img1.jpg", "img2.jpg", "img3.jpg"];
      const nextImage = () => setIndex((i) => (i + 1) % images.length);
      const interval = setInterval(nextImage, 3000);
      onCleanup(() => clearInterval(interval));
      return <img src={images[index()]} alt="carousel image" />;
    }`,
    },
    {
        title: 'Lazy-loaded components not loading on scroll',
        description: 'Lazy-loaded components do not appear when scrolling down the page.',
        stacktrace: `import { createSignal, onCleanup } from "solid-js";
    function LazyComponent() {
      const [isVisible, setIsVisible] = createSignal(false);
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      });
      onCleanup(() => observer.disconnect());
      return isVisible() ? <div>Loaded content</div> : <div>Loading...</div>;
    }`,
    },
    {
        title: 'Pagination controls not updating page numbers',
        description: 'The pagination controls do not update the page number when navigating through items.',
        stacktrace: `import { createSignal } from "solid-js";
    function Pagination() {
      const [page, setPage] = createSignal(1);
      return (
        <div>
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
          <span>Page {page()}</span>
          <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </div>
      );
    }`,
    },
    {
        title: 'Scroll position reset on page navigation',
        description: 'The scroll position resets to the top when navigating between pages, causing a bad user experience.',
        stacktrace: `import { createEffect } from "solid-js";
    function ScrollRestoration() {
      createEffect(() => {
        window.scrollTo(0, 0);
      });
      return <div>Page Content</div>;
    }`,
    },
    {
        title: 'Browser back button not working in single-page application',
        description: 'The back button does not return the user to the previous view in a single-page application.',
        stacktrace: `import { createSignal } from "solid-js";
    import { useNavigate } from "solid-app-router";
    function App() {
      const navigate = useNavigate();
      return (
        <div>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      );
    }`,
    },
    {
        title: 'Modal window closing when clicking outside',
        description: 'Clicking outside the modal window causes it to close even when the user is filling a form inside.',
        stacktrace: `import { createSignal } from "solid-js";
    function Modal() {
      const [isOpen, setIsOpen] = createSignal(true);
      return (
        <div onClick={() => setIsOpen(false)}>
          {isOpen() && (
            <div class="modal">
              <div onClick={(e) => e.stopPropagation()}>
                Modal Content
              </div>
            </div>
          )}
        </div>
      );
    }`,
    },
    {
        title: 'Table sorting not working with numeric values',
        description: 'Sorting the table by numeric columns is incorrect, treating numbers as strings.',
        stacktrace: `import { createSignal } from "solid-js";
    function Table() {
      const [rows, setRows] = createSignal([{ value: 10 }, { value: 5 }, { value: 20 }]);
      const sortTable = () => {
        setRows([...rows()].sort((a, b) => a.value - b.value));
      };
      return (
        <table>
          <thead>
            <tr><th onClick={sortTable}>Value</th></tr>
          </thead>
          <tbody>
            {rows().map(row => <tr><td>{row.value}</td></tr>)}
          </tbody>
        </table>
      );
    }`,
    },
    {
        title: 'Dropdown options appearing behind other elements',
        description: 'The dropdown options are rendered behind other elements, making them partially visible.',
        stacktrace: `import { createSignal } from "solid-js";
    function Dropdown() {
      const [isOpen, setIsOpen] = createSignal(false);
      return (
        <div>
          <button onClick={() => setIsOpen(!isOpen())}>Toggle</button>
          {isOpen() && (
            <ul style={{ zIndex: 10 }}>
              <li>Option 1</li>
              <li>Option 2</li>
            </ul>
          )}
        </div>
      );
    }`,
    },
    {
        title: 'Content flickering during rerender',
        description: 'Page content flickers whenever state is updated, causing a disruptive visual effect.',
        stacktrace: `import { createSignal } from "solid-js";
    function FlickeringComponent() {
      const [count, setCount] = createSignal(0);
      return (
        <div>
          <button onClick={() => setCount(count() + 1)}>Increment</button>
          <p>Count: {count()}</p>
        </div>
      );
    }`,
    },
    {
        title: 'Accessibility issue: Missing aria labels on buttons',
        description: 'Buttons are missing appropriate aria-labels for screen readers, making the interface inaccessible.',
        stacktrace: `import { createSignal } from "solid-js";
    function AccessibleButton() {
      const [clicked, setClicked] = createSignal(false);
      return (
        <button aria-label="Click me" onClick={() => setClicked(true)}>
          {clicked() ? "Clicked" : "Click me"}
        </button>
      );
    }`,
    },
    {
        title: 'Multi-step form navigation not preserving input data',
        description: 'When navigating between steps in a multi-step form, input data is lost between steps.',
        stacktrace: `import { createSignal } from "solid-js";
    function MultiStepForm() {
      const [step, setStep] = createSignal(1);
      const [formData, setFormData] = createSignal({ name: '', email: '' });
      return (
        <div>
          {step() === 1 && <input type="text" value={formData().name} onInput={(e) => setFormData({ ...formData(), name: e.target.value })} placeholder="Name" />}
          {step() === 2 && <input type="email" value={formData().email} onInput={(e) => setFormData({ ...formData(), email: e.target.value })} placeholder="Email" />}
          <button onClick={() => setStep(step() === 1 ? 2 : 1)}>Next</button>
        </div>
      );
    }`,
    },
    {
        title: 'Dropdowns not keyboard accessible',
        description: 'Dropdown menus are not accessible via keyboard navigation, hindering users with disabilities.',
        stacktrace: `import { createSignal } from "solid-js";
    function KeyboardAccessibleDropdown() {
      const [isOpen, setIsOpen] = createSignal(false);
      return (
        <div>
          <button onKeyDown={(e) => (e.key === 'Enter' ? setIsOpen(!isOpen()) : null)}>
            Toggle Dropdown
          </button>
          {isOpen() && (
            <ul>
              <li tabIndex="0">Option 1</li>
              <li tabIndex="0">Option 2</li>
            </ul>
          )}
        </div>
      );
    }`,
    },

];