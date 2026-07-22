src/component/Toast.jsx:
    useToast is a custom hook which shows "notification popup" anywhere on any page.
    > Part 1 — ToastProvider: This is a wrapper that covers the entire app and manages the state of toasts (which message should be displayed and when it should be removed).

    > Part 2 — useToast(): This is a hook that you can call inside any component to get the showToast function. As soon as you call showToast, a notification appears on the screen.