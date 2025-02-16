import React from 'react';
import {
  CheckCircleOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
} from '@ant-design/icons';

import { useSelector } from 'react-redux';
import dashboardIcon from '../../assets/icon-dashboard.jpg';
import { ButtonComponent } from '../../components/Button';
import { ModalComponent } from '../../components/ModalComponent';
import {
  Container,
  Header,
  StyledSwitch,
  StyledImage,
  Content,
  ContentTitle,
  ContentHeader,
  StyledTable,
  StyledTag,
  Footer,
} from './styles';
import { ActionButtons } from '../../components/ActionButtons';
import { useTheme } from '../../hooks/useTheme';
import {
  IState,
  ITaskItem,
  ResponsiveTypes,
  SortType,
  PaginationConfig,
} from '../../types';

function Dashboard() {
  const [taskData, setTaskData] = React.useState<ITaskItem>({} as ITaskItem);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [mode, setMode] = React.useState<'isEdit' | 'isNew'>('isEdit');
  const { toogleTheme, theme } = useTheme();

  const tasks = useSelector<IState, ITaskItem[]>(state => state.tasks);

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleEditModal = (data: ITaskItem) => {
    setModalOpen(true);
    setTaskData(data);
    setMode('isEdit');
  };
  const handleNewModal = () => {
    setModalOpen(true);
    setMode('isNew');
  };

  const columns = [
    {
      title: 'Rótulo',
      dataIndex: 'label',
      align: 'center' as const,
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      align: 'center' as const,
      responsive: ['md'] as ResponsiveTypes,
    },
    {
      title: 'Data de Criação',
      dataIndex: 'createDate',
      align: 'center' as const,
      responsive: ['xl'] as ResponsiveTypes,
    },
    {
      title: 'Data de Alteração',
      dataIndex: 'changeDate',
      align: 'center' as const,
      render: (changedDate: string) => changedDate ?? '-',
      responsive: ['xl'] as ResponsiveTypes,
    },
    {
      title: 'Concluída',
      dataIndex: 'checked',
      defaultSortOrder: 'ascend' as SortType,
      sorter: (a: any, b: any) => a.checked - b.checked,
      showSorterTooltip: {
        title: 'Por ordem Crescente/Decrescente',
      },
      align: 'center' as const,
      render: (status: boolean) =>
        status ? (
          <StyledTag color="success" myTheme={theme}>
            Sim
          </StyledTag>
        ) : (
          <StyledTag color="error" myTheme={theme}>
            Não
          </StyledTag>
        ),
    },
    {
      title: 'Ações',
      align: 'center' as const,
      width: '10%',
      render: (data: ITaskItem) => {
        return (
          <ActionButtons
            handleEditModal={() => handleEditModal(data)}
            data={data}
          />
        );
      },
    },
  ];

  const styleConfig: React.CSSProperties = {
    color: theme === 'light' ? 'dodgerblue' : '#FFF',
    fontSize: '1.2rem',
  };
  const paginationConfig: PaginationConfig = {
    defaultPageSize: 10,
    prevIcon: <LeftCircleOutlined style={styleConfig} />,
    nextIcon: <RightCircleOutlined style={styleConfig} />,
    position: ['bottomCenter'],
    responsive: true,
    showTotal: (total, range) => {
      return `Exibindo ${range[0]}-${range[1]} de ${total} registros`;
    },
  };
  return (
    <Container myTheme={theme}>
      <ModalComponent
        mode={mode}
        isOpen={modalOpen}
        task={taskData}
        onRequestClose={() => handleCloseModal()}
      />
      <Header myTheme={theme}>
        <span>Dashboard</span>
        <StyledImage src={dashboardIcon} preview={false} />

        <StyledSwitch
          onChange={toogleTheme}
          checkedChildren="light"
          unCheckedChildren="dark"
        />
      </Header>
      <Content>
        <ContentHeader myTheme={theme}>
          <ContentTitle>Aqui estão suas tarefas :</ContentTitle>
          <ButtonComponent
            name="Adicionar Tarefa"
            icon={<CheckCircleOutlined />}
            type={theme === 'light' ? 'primary' : 'dashed'}
            onClick={handleNewModal}
          />
        </ContentHeader>
        <StyledTable
          columns={columns}
          bordered={theme === 'light'}
          myTheme={theme}
          tableLayout="auto"
          dataSource={tasks}
          pagination={paginationConfig}
          locale={{ emptyText: 'Nenhuma tarefa encontrada' }}
        />
      </Content>
      <Footer myTheme={theme}>
        © Copyright {new Date().getFullYear()} Dashboard
      </Footer>
    </Container>
  );
}

export default Dashboard;
