<template>
  <div class="chat-container">
    <h2>Chat with AI</h2>
    <div class="chat-box">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <span :class="{ user: message.user, ai: !message.user }">
          {{ message.text }}
        </span>
      </div>
    </div>
    <div class="input-container">
      <textarea v-model="userInput" placeholder="Type your message here..."></textarea>
      <button @click="sendMessage">Send</button>
      <button @click="startRecording">🎤 Speak</button>
    </div>
    <p v-if="isRecording">Recording... Speak now!</p>
  </div>
</template>

<script>
export default {
  name: "Chat",
  data() {
    return {
      messages: [],
      userInput: "",
      isRecording: false,
      recognition: null,
      speechSynthesis: window.speechSynthesis,
    };
  },
  mounted() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = "en-US";
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;

      this.recognition.addEventListener("result", (event) => {
        const transcript = event.results[0][0].transcript;
        this.userInput = transcript;
        this.isRecording = false;
      });

      this.recognition.addEventListener("end", () => {
        this.isRecording = false;
      });
    } else {
      alert("Your browser does not support speech recognition.");
    }
  },
  methods: {
    async sendMessage() {
      if (!this.userInput.trim()) return;
      this.messages.push({ text: this.userInput, user: true });
      const userMessage = this.userInput;
      this.userInput = "";

      try {
        const response = await fetch("http://<YOUR_BACKEND_URL>/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage }),
        });
        const data = await response.json();
        this.messages.push({ text: data.reply, user: false });
        this.speakMessage(data.reply);
      } catch (error) {
        console.error("Error:", error);
        this.messages.push({ text: "Error occurred.", user: false });
      }
    },
    startRecording() {
      if (this.recognition) {
        this.isRecording = true;
        this.recognition.start();
      }
    },
    speakMessage(text) {
      if (this.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        this.speechSynthesis.speak(utterance);
      }
    },
  },
};
</script>

<style>
.chat-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.chat-box {
  border: 1px solid #ddd;
  padding: 10px;
  height: 300px;
  overflow-y: scroll;
  margin-bottom: 20px;
}

.message {
  margin-bottom: 10px;
}

.user {
  color: blue;
  font-weight: bold;
}

.ai {
  color: green;
  font-weight: bold;
}

.input-container {
  display: flex;
  gap: 10px;
}

textarea {
  flex: 1;
  height: 50px;
}
</style>
