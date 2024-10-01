const Instructions = () => {
  return (
    <div>
      <h2>Инструкция по использованию приложения</h2>
      <ul>
        <li>
          Перейдите на сайт{' '}
          <a
            href="https://react-icons.github.io/react-icons/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Icons
          </a>
          .
        </li>
        <li>
          Выберите нужную библиотеку иконок (например, Ant Design Icons,
          Bootstrap Icons и т.д.).
        </li>
        <li>Найдите и выберите нужную иконку.</li>
        <li>
          Скопируйте строку импорта для первой строки ввода. Например:
          <pre>
            <code>{`import { DiApple } from "react-icons/di";`}</code>
          </pre>
        </li>
        <li>
          Для второго поля ввода введите название иконки без скобочек. Например,
          для <code>DiApple</code> просто введите:
          <pre>
            <code>{`DiApple`}</code>
          </pre>
        </li>
        <li>Нажмите кнопку Загрузить иконку, чтобы отобразить иконку.</li>
        <li>
          После этого нажмите кнопку Скачать SVG , чтобы скачать иконку в
          формате SVG.
        </li>
      </ul>
    </div>
  );
};

export default Instructions;
