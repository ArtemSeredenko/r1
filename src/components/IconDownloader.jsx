import { useState } from 'react';
import { saveAs } from 'file-saver';
import '../App.css';

// Импортируем необходимые библиотеки иконок
import * as AiIcons from 'react-icons/ai'; // Ant Design Icons
import * as BsIcons from 'react-icons/bs'; // Bootstrap Icons
import * as BiIcons from 'react-icons/bi'; // BoxIcons
import * as CiIcons from 'react-icons/ci'; // Circum Icons
import * as CgIcons from 'react-icons/cg'; // css.gg
import * as DiIcons from 'react-icons/di'; // Devicons
import * as FiIcons from 'react-icons/fi'; // Feather
import * as FcIcons from 'react-icons/fc'; // Flat Color Icons
import * as FaIcons from 'react-icons/fa'; // Font Awesome 5
import * as Fa6Icons from 'react-icons/fa6'; // Font Awesome 6
import * as GiIcons from 'react-icons/gi'; // Game Icons
import * as GoIcons from 'react-icons/go'; // Github Octicons icons
import * as GrIcons from 'react-icons/gr'; // Grommet-Icons
import * as HiIcons from 'react-icons/hi'; // Heroicons
import * as Hi2Icons from 'react-icons/hi2'; // Heroicons 2
import * as ImIcons from 'react-icons/im'; // IcoMoon Free
import * as LiaIcons from 'react-icons/lia'; // Icons8 Line Awesome
import * as IoIcons from 'react-icons/io'; // Ionicons 4
import * as Io5Icons from 'react-icons/io5'; // Ionicons 5
import * as LuIcons from 'react-icons/lu'; // Lucide
import * as MdIcons from 'react-icons/md'; // Material Design icons
import * as PiIcons from 'react-icons/pi'; // Phosphor Icons
import * as RxIcons from 'react-icons/rx'; // Radix Icons
import * as SiIcons from 'react-icons/si'; // Simple Icons
import * as SlIcons from 'react-icons/sl'; // Simple Line Icons
import * as TbIcons from 'react-icons/tb'; // Tabler Icons
import * as TfiIcons from 'react-icons/tfi'; // Themify Icons
import * as TiIcons from 'react-icons/ti'; // Typicons
import * as VscIcons from 'react-icons/vsc'; // VS Code Icons
import * as WiIcons from 'react-icons/wi'; // Weather Icons
// Добавляем другие библиотеки по мере необходимости

const iconLibraries = {
  ai: AiIcons,
  bs: BsIcons,
  bi: BiIcons,
  ci: CiIcons,
  cg: CgIcons,
  di: DiIcons,
  fi: FiIcons,
  fc: FcIcons,
  fa: FaIcons,
  fa6: Fa6Icons,
  gi: GiIcons,
  go: GoIcons,
  gr: GrIcons,
  hi: HiIcons,
  hi2: Hi2Icons,
  im: ImIcons,
  lia: LiaIcons,
  io: IoIcons,
  io5: Io5Icons,
  lu: LuIcons,
  md: MdIcons,
  pi: PiIcons,
  rx: RxIcons,
  si: SiIcons,
  sl: SlIcons,
  tb: TbIcons,
  tfi: TfiIcons,
  ti: TiIcons,
  vsc: VscIcons,
  wi: WiIcons,
  // Добавляем другие библиотеки сюда
};

const IconDownloader = () => {
  const [importString, setImportString] = useState('');
  const [iconName, setIconName] = useState('');
  const [IconComponent, setIconComponent] = useState(null);
  const [error, setError] = useState(null);

  const handleImportChange = (e) => setImportString(e.target.value);
  const handleIconNameChange = (e) => setIconName(e.target.value);

  const handleLoadIcon = () => {
    setError(null);

    // Используем регулярное выражение для извлечения имени иконки и библиотеки
    const match = importString.match(
      /import\s+\{\s*(\w+)\s*\}\s+from\s+['"]react-icons\/(\w+)['"]/
    );

    if (match) {
      const [, icon, lib] = match;

      // Проверяем, есть ли такая библиотека
      if (iconLibraries[lib]) {
        const iconSet = iconLibraries[lib];

        // Проверяем, существует ли иконка в наборе
        if (iconSet[icon]) {
          setIconComponent(() => iconSet[icon]);
        } else {
          setError(`Иконка "${icon}" не найдена в библиотеке "${lib}".`);
        }
      } else {
        setError(`Библиотека "${lib}" не найдена.`);
      }
    } else {
      setError('Неверный формат строки импорта.');
    }
  };

  // Функция для преобразования компонента иконки в SVG строку
  const getSvgContent = () => {
    if (!IconComponent) return null;

    // Создаем новый SVG элемент
    const svgElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgElement.setAttribute('width', '64');
    svgElement.setAttribute('height', '64');
    svgElement.setAttribute('viewBox', '0 0 24 24');

    // Вставляем контент иконки
    const iconInstance = IconComponent({ size: 64 });
    svgElement.innerHTML = iconInstance.props.children
      .map((child) => {
        return child.type === 'path' ? `<path d="${child.props.d}" />` : '';
      })
      .join('');

    return svgElement.outerHTML;
  };

  const handleDownload = () => {
    const svgContent = getSvgContent();
    if (svgContent) {
      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
      saveAs(svgBlob, `${iconName}.svg`);
    }
  };

  return (
    <div>
      <h1>Icon to SVG Downloader</h1>
      <input
        type="text"
        placeholder='import { HiAcademicCap } from "react-icons/hi";'
        value={importString}
        onChange={handleImportChange}
      />
      <button onClick={handleLoadIcon}>Загрузить иконку</button>

      <input
        type="text"
        placeholder="Введите название иконки (например, HiAcademicCap)"
        value={iconName}
        onChange={handleIconNameChange}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        {IconComponent && (
          <div>
            <IconComponent size={64} />
            <button onClick={handleDownload}>Скачать SVG</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IconDownloader;
