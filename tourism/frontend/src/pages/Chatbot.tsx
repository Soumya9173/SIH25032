import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap';
import { tourismService } from '../services/tourismService';
import { ChatRequest, ChatResponse } from '../types';
import toast from 'react-hot-toast';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const ChatbotInterface: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [language, setLanguage] = useState<string>('en');
  const [context, setContext] = useState<string>('tourism');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastResponse, setLastResponse] = useState<ChatResponse | null>(null);

  const sendMessage = async () => {
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    const userMsg: Message = { role: 'user', text: message.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    const payload: ChatRequest = {
      message: message.trim(),
      language,
      context,
    };

    try {
      const response = await tourismService.askChatbot(payload);
      const assistantMsg: Message = { role: 'assistant', text: response.response };
      setMessages((prev) => [...prev, assistantMsg]);
      setLastResponse(response);
      setMessage('');
    } catch (err: any) {
      toast.error(err.message || 'Failed to get chatbot response');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading) {
        sendMessage();
      }
    }
  };

  const handleSuggestion = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <div className="min-vh-100 d-flex align-items-start bg-light py-4">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="shadow-sm">
              <CardBody>
                <h3 className="mb-3">Chatbot</h3>

                <Row className="g-2 mb-3">
                  <Col md={4}>
                    <Label for="language" className="small text-muted">Language</Label>
                    <Input
                      id="language"
                      type="select"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="en">English (en)</option>
                      <option value="hi">Hindi (hi)</option>
                      <option value="tribal">Tribal (placeholder)</option>
                    </Input>
                  </Col>
                  <Col md={8}>
                    <Label for="context" className="small text-muted">Context</Label>
                    <Input
                      id="context"
                      type="select"
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                    >
                      <option value="tourism">Tourism</option>
                      <option value="accommodation">Accommodation</option>
                      <option value="transport">Transport</option>
                      <option value="food">Food</option>
                    </Input>
                  </Col>
                </Row>

                <div
                  className="border rounded p-3 mb-3 bg-white"
                  style={{ height: 360, overflowY: 'auto' }}
                >
                  {messages.length === 0 ? (
                    <div className="text-muted">Start the conversation by asking a question about Jharkhand.</div>
                  ) : (
                    messages.map((m, idx) => (
                      <div key={idx} className={`mb-2 ${m.role === 'user' ? 'text-end' : 'text-start'}`}>
                        <div
                          className={`d-inline-block px-3 py-2 rounded ${
                            m.role === 'user' ? 'bg-primary text-white' : 'bg-light'
                          }`}
                          style={{ maxWidth: '85%' }}
                        >
                          {m.text}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {lastResponse?.suggestions && lastResponse.suggestions.length > 0 && (
                  <div className="mb-3">
                    <div className="small text-muted mb-2">Suggestions</div>
                    <div className="d-flex flex-wrap gap-2">
                      {lastResponse.suggestions.map((s, i) => (
                        <Button key={i} size="sm" color="secondary" outline onClick={() => handleSuggestion(s)}>
                          {s}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <Row className="g-2">
                  <Col xs={9} md={10}>
                    <Input
                      placeholder="Ask about places, transport, food, culture..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isLoading}
                    />
                  </Col>
                  <Col xs={3} md={2}>
                    <Button color="primary" className="w-100" onClick={sendMessage} disabled={isLoading}>
                      {isLoading ? 'Sending...' : 'Send'}
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChatbotInterface;