import {createApp, h} from 'vue';
import Toast from '@/components/ToastComponent.vue';

export function useToast() {
  const showToast = (message, type = 'info', duration = 3000) => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const app = createApp({
      render() {
        return h(Toast, {message, type, duration});
      }
    });

    app.mount(div);

    setTimeout(() => {
      app.unmount();
      document.body.removeChild(div);
    }, duration + 400);
  };

  return {showToast};
}
