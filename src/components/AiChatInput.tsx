import "./AiChatInput.css";

export function AiChatInput() {
  return (
    <div className="container-ai-input">
      {/* Grid areas for 3D hover effect */}
      {[...Array(15)].map((_, i) => (
        <div key={i} className="area" />
      ))}

      <div className="container-wrap">
        <div className="card">
          <div className="background-blur-balls">
            <div className="balls">
              <span className="ball rosa"></span>
              <span className="ball violet"></span>
              <span className="ball green"></span>
              <span className="ball cyan"></span>
            </div>
          </div>
          <div className="content-card">
            <div className="background-blur-card">
              <div className="eyes">
                <span className="eye"></span>
                <span className="eye"></span>
              </div>
              <div className="eyes happy">
                <svg fill="none" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M8.28386 16.2843C8.9917 15.7665 9.8765 14.731 12 14.731C14.1235 14.731 15.0083 15.7665 15.7161 16.2843C17.8397 17.8376 18.7542 16.4845 18.9014 15.7665C19.4323 13.1777 17.6627 11.1066 17.3088 10.5888C16.3844 9.23666 14.1235 8 12 8C9.87648 8 7.61556 9.23666 6.69122 10.5888C6.33728 11.1066 4.56771 13.1777 5.09858 15.7665C5.24582 16.4845 6.16034 17.8376 8.28386 16.2843Z"
                  />
                </svg>
                <svg fill="none" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M8.28386 16.2843C8.9917 15.7665 9.8765 14.731 12 14.731C14.1235 14.731 15.0083 15.7665 15.7161 16.2843C17.8397 17.8376 18.7542 16.4845 18.9014 15.7665C19.4323 13.1777 17.6627 11.1066 17.3088 10.5888C16.3844 9.23666 14.1235 8 12 8C9.87648 8 7.61556 9.23666 6.69122 10.5888C6.33728 11.1066 4.56771 13.1777 5.09858 15.7665C5.24582 16.4845 6.16034 17.8376 8.28386 16.2843Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
