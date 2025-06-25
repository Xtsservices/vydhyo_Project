"use client";
import React, { useState, useEffect } from 'react';
import AppHeader from '../../components/header';
import {
    Layout,
    Menu,
    Card,
    Table,
    Button,
    Input,
    Form,
    Modal,
    message,
    Space,
    Typography,
    Popconfirm,
    Spin,
    Empty,
    notification
} from 'antd';
import {
    SettingOutlined,
    BookOutlined,
    UserOutlined,
    BellOutlined,
    SafetyOutlined,
    GlobalOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    SaveOutlined,
    MedicineBoxOutlined,
    HeartOutlined,
    ExperimentOutlined,
    UserSwitchOutlined,
    BankOutlined,
    StarOutlined,
    ManOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { API_BASE } from '../../services';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const SettingsPage = () => {
    type CatalogueItem = { 
        id: string; 
        name: string; 
        aliasName: string;
        isActive: number;
        _id: string;
    };

    type SectionKey =
        | 'specializations'
        | 'allergy'
        | 'bloodGroup'
        | 'chronicConditions'
        | 'degree'
        | 'department'
        | 'doctorType'
        | 'feature'
        | 'gender'
        | 'hospital';

    const [specializations, setSpecializations] = useState<CatalogueItem[]>([]);
    const [allergies, setAllergies] = useState<CatalogueItem[]>([]);
    const [bloodGroups, setBloodGroups] = useState<CatalogueItem[]>([]);
    const [chronicConditions, setChronicConditions] = useState<CatalogueItem[]>([]);
    const [degrees, setDegrees] = useState<CatalogueItem[]>([]);
    const [departments, setDepartments] = useState<CatalogueItem[]>([]);
    const [doctorTypes, setDoctorTypes] = useState<CatalogueItem[]>([]);
    const [features, setFeatures] = useState<CatalogueItem[]>([]);
    const [genders, setGenders] = useState<CatalogueItem[]>([]);
    const [hospitals, setHospitals] = useState<CatalogueItem[]>([]);
    
    const [loading, setLoading] = useState(false);
    const [activeSection, setActiveSection] = useState<SectionKey>('specializations');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState<CatalogueItem | null>(null);
    const [form] = Form.useForm();

    // Get token from localStorage
    const getToken = () => {
        return localStorage.getItem('accessToken');
    };

    // API Headers
    const getHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
    });

    // Transform API response data to match component expectations
    const transformData = (apiData: any[], idField: string) => {
        if (!Array.isArray(apiData)) return [];
        
        return apiData.map(item => ({
            id: item[idField] || item._id,
            name: item.name,
            aliasName: item.aliasName,
            isActive: item.isActive,
            _id: item._id
        }));
    };

    // Generic fetch function
    const fetchData = async (endpoint: string, setter: Function, entityName: string, idField: string) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}${endpoint}`, {
                headers: getHeaders()
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch ${entityName}`);
            }

            const result = await response.json();
            console.log(`${entityName} API Response:`, result);
            
            // Extract data array from the response
            const data = result.data || result;
            const transformedData = transformData(data, idField);
            
            setter(transformedData);
            message.success(`${entityName} loaded successfully`);
            
            // Toast notification for data loaded
            notification.success({
                message: `${entityName} Loaded`,
                description: `${entityName} data has been loaded successfully!`,
                placement: 'topRight',
                duration: 3,
            });
        } catch (err) {
            console.error(`Error fetching ${entityName}:`, err);
            const errorMsg = (err instanceof Error) ? err.message : String(err);
            message.error(`Error fetching ${entityName}: ${errorMsg}`);
            
            // Toast notification for error
            notification.error({
                message: `Error Loading ${entityName}`,
                description: `Failed to load ${entityName}: ${errorMsg}`,
                placement: 'topRight',
                duration: 4,
            });
            setter([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch functions for each section
    const fetchSpecializations = () => fetchData('/catalogue/specialization/getSpecializations', setSpecializations, 'Specializations', 'specializationsId');
    const fetchAllergies = () => fetchData('/catalogue/allergy/getAllergy', setAllergies, 'Allergies', 'allergyId');
    const fetchBloodGroups = () => fetchData('/catalogue/bloodGroup/getBloodGroup', setBloodGroups, 'Blood Groups', 'bloodGroupId');
    const fetchChronicConditions = () => fetchData('/catalogue/ChronicConditions/getChronicConditions', setChronicConditions, 'Chronic Conditions', 'chronicId');
    const fetchDegrees = () => fetchData('/catalogue/degree/getDegree', setDegrees, 'Degrees', 'degreeId');
    const fetchDepartments = () => fetchData('/catalogue/department/getDepartment', setDepartments, 'Departments', 'departmentID');
    const fetchDoctorTypes = () => fetchData('/catalogue/doctorType/getDoctorType', setDoctorTypes, 'Doctor Types', 'doctortypeId');
    const fetchFeatures = () => fetchData('/catalogue/feature/getFeature', setFeatures, 'Features', 'featureId');
    const fetchGenders = () => fetchData('/catalogue/gender/getGenders', setGenders, 'Genders', 'genderID');
    const fetchHospitals = () => fetchData('/catalogue/hospital/getHospital', setHospitals, 'Hospitals', 'hospitalID');

    // Generic submit function
    const handleGenericSubmit = async (values: any, sectionConfig: any) => {
        setLoading(true);
        try {
            const isEditing = editingRecord !== null;
            const { createEndpoint, updateEndpoint, idField, entityName, refreshFunction } = sectionConfig;
            
            const url = isEditing ? `${API_BASE}${updateEndpoint}` : `${API_BASE}${createEndpoint}`;
            
            let payload;
            if (isEditing) {
                payload = { [idField]: editingRecord.id, name: values.name };
            } else {
                // Only for gender, use 'type' instead of 'name'
                if (sectionConfig.createEndpoint === '/catalogue/gender/createGender') {
                    payload = { type: values.name };
                } else {
                    payload = { name: values.name };
                }
            }


            const response = await fetch(url, {
                method: isEditing ? 'PUT' : 'POST',
                headers: getHeaders(),
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Failed to ${isEditing ? 'update' : 'create'} ${entityName}`);
            }

            message.success(`${entityName} ${isEditing ? 'updated' : 'created'} successfully!`);
            
            // Toast notification for successful create/update
            notification.success({
                message: `${entityName} ${isEditing ? 'Updated' : 'Created'}`,
                description: `${entityName} "${values.name}" has been ${isEditing ? 'updated' : 'created'} successfully!`,
                placement: 'topRight',
                duration: 3,
            });
            
            setIsModalVisible(false);
            setEditingRecord(null);
            form.resetFields();
            refreshFunction();
        } catch (err) {
            console.error(`Error ${editingRecord ? 'updating' : 'creating'} ${sectionConfig.entityName}:`, err);
            const errorMsg = (err instanceof Error) ? err.message : String(err);
            message.error(`Error ${editingRecord ? 'updating' : 'creating'} ${sectionConfig.entityName}: ${errorMsg}`);
            
            // Toast notification for error
            notification.error({
                message: `Error ${editingRecord ? 'Updating' : 'Creating'} ${sectionConfig.entityName}`,
                description: `Failed to ${editingRecord ? 'update' : 'create'} ${sectionConfig.entityName}: ${errorMsg}`,
                placement: 'topRight',
                duration: 4,
            });
        } finally {
            setLoading(false);
        }
    };

    // Generic delete function
    const handleGenericDelete = async (id: string, sectionConfig: any) => {
        setLoading(true);
        try {
            const { deleteEndpoint, idField, entityName, refreshFunction } = sectionConfig;
            
            const response = await fetch(`${API_BASE}${deleteEndpoint}`, {
                method: 'DELETE',
                headers: getHeaders(),
                body: JSON.stringify({ [idField]: id })
            });

            if (!response.ok) {
                throw new Error(`Failed to delete ${entityName}`);
            }

            message.success(`${entityName} deleted successfully!`);
            
            // Toast notification for successful delete
            notification.success({
                message: `${entityName} Deleted`,
                description: `${entityName} has been deleted successfully!`,
                placement: 'topRight',
                duration: 3,
            });
            
            refreshFunction();
        } catch (err) {
            console.error(`Error deleting ${sectionConfig.entityName}:`, err);
            const errorMsg = (err instanceof Error) ? err.message : String(err);
            message.error(`Error deleting ${sectionConfig.entityName}: ${errorMsg}`);
            
            // Toast notification for error
            notification.error({
                message: `Error Deleting ${sectionConfig.entityName}`,
                description: `Failed to delete ${sectionConfig.entityName}: ${errorMsg}`,
                placement: 'topRight',
                duration: 4,
            });
        } finally {
            setLoading(false);
        }
    };

    // Section configurations
    const sectionConfigs = {
        specializations: {
            createEndpoint: '/catalogue/specialization/createSpecializations',
            updateEndpoint: '/catalogue/specialization/updateSpecializations',
            deleteEndpoint: '/catalogue/specialization/deleteSpecializations',
            idField: 'specializationsId',
            entityName: 'Specialization',
            refreshFunction: fetchSpecializations,
            data: specializations
        },
        allergy: {
            createEndpoint: '/catalogue/allergy/createAllergy',
            updateEndpoint: '/catalogue/allergy/updateAllergy',
            deleteEndpoint: '/catalogue/allergy/deleteAllergy',
            idField: 'allergyId',
            entityName: 'Allergy',
            refreshFunction: fetchAllergies,
            data: allergies
        },
        bloodGroup: {
            createEndpoint: '/catalogue/bloodGroup/createBloodGroup',
            updateEndpoint: '/catalogue/bloodGroup/updateBloodGroup',
            deleteEndpoint: '/catalogue/bloodGroup/deleteBloodGroup',
            idField: 'bloodGroupId',
            entityName: 'Blood Group',
            refreshFunction: fetchBloodGroups,
            data: bloodGroups
        },
        chronicConditions: {
            createEndpoint: '/catalogue/ChronicConditions/createChronicConditions',
            updateEndpoint: '/catalogue/ChronicConditions/updateChronicConditions',
            deleteEndpoint: '/catalogue/ChronicConditions/deleteChronicConditions',
            idField: 'chronicId',
            entityName: 'Chronic Condition',
            refreshFunction: fetchChronicConditions,
            data: chronicConditions
        },
        degree: {
            createEndpoint: '/catalogue/degree/createDegree',
            updateEndpoint: '/catalogue/degree/updateDegree',
            deleteEndpoint: '/catalogue/degree/deleteDegree',
            idField: 'degreeId',
            entityName: 'Degree',
            refreshFunction: fetchDegrees,
            data: degrees
        },
        department: {
            createEndpoint: '/catalogue/department/createDepartment',
            updateEndpoint: '/catalogue/department/updateDepartment',
            deleteEndpoint: '/catalogue/department/deleteDepartment',
            idField: 'departmentID',
            entityName: 'Department',
            refreshFunction: fetchDepartments,
            data: departments
        },
        doctorType: {
            createEndpoint: '/catalogue/doctorType/createDoctorType',
            updateEndpoint: '/catalogue/doctorType/updateDoctorType',
            deleteEndpoint: '/catalogue/doctorType/deleteDoctorType',
            idField: 'doctortypeId',
            entityName: 'Doctor Type',
            refreshFunction: fetchDoctorTypes,
            data: doctorTypes
        },
        feature: {
            createEndpoint: '/catalogue/feature/createFeature',
            updateEndpoint: '/catalogue/feature/updateFeature',
            deleteEndpoint: '/catalogue/feature/deleteFeature',
            idField: 'featureId',
            entityName: 'Feature',
            refreshFunction: fetchFeatures,
            data: features
        },
        gender: {
            createEndpoint: '/catalogue/gender/createGender',
            updateEndpoint: '/catalogue/gender/updateGender',
            deleteEndpoint: '/catalogue/gender/deleteGender',
            idField: 'genderID',
            entityName: 'Gender',
            refreshFunction: fetchGenders,
            data: genders
        },
        hospital: {
            createEndpoint: '/catalogue/hospital/createHospital',
            updateEndpoint: '/catalogue/hospital/updateHospital',
            deleteEndpoint: '/catalogue/hospital/deleteHospital',
            idField: 'hospitalID',
            entityName: 'Hospital',
            refreshFunction: fetchHospitals,
            data: hospitals
        }
    };

    // Handle form submit based on active section
    const handleSubmit = async (values: any) => {
        const config = sectionConfigs[activeSection];
        if (config) {
            await handleGenericSubmit(values, config);
        }
    };

    // Handle delete based on active section
    const handleDelete = async (id: string) => {
        const config = sectionConfigs[activeSection];
        if (config) {
            await handleGenericDelete(id, config);
        }
    };

    // Open modal for add/edit
    const openModal = (record: CatalogueItem | null = null) => {
        setEditingRecord(record);
        setIsModalVisible(true);
        if (record) {
            form.setFieldsValue({ name: record.name });
        } else {
            form.resetFields();
        }
    };

    // Close modal
    const closeModal = () => {
        setIsModalVisible(false);
        setEditingRecord(null);
        form.resetFields();
    };

    // Load data on component mount or section change
    useEffect(() => {
        const config = sectionConfigs[activeSection];
        if (config) {
            config.refreshFunction();
        }
    }, [activeSection]);

    // Menu items
    const menuItems = [
        {
            key: 'specializations',
            icon: <BookOutlined />,
            label: 'Specializations',
        },
      
        {
            key: 'bloodGroup',
            icon: <HeartOutlined />,
            label: 'Blood Groups',
        },
       
        {
            key: 'degree',
            icon: <BookOutlined />,
            label: 'Degrees',
        },
     
        {
            key: 'doctorType',
            icon: <UserSwitchOutlined />,
            label: 'Doctor Types',
        },
        {
            key: 'feature',
            icon: <StarOutlined />,
            label: 'Features',
        },
        {
            key: 'gender',
            icon: <ManOutlined />,
            label: 'Genders',
        },
        {
            key: 'hospital',
            icon: <HomeOutlined />,
            label: 'Hospitals',
        },
        
    ];

    // Table columns for all catalogue sections
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 100,
        },
       
        {
            title: ' Name',
            dataIndex: 'aliasName',
            key: 'Name',
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            width: 80,
            render: (isActive: number) => (
                <span style={{ 
                    color: isActive === 1 ? '#52c41a' : '#f5222d',
                    fontWeight: 'bold'
                }}>
                    {isActive === 1 ? 'Active' : 'Inactive'}
                </span>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 150,
            render: (_: unknown, record: CatalogueItem) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => openModal(record)}
                        style={{ 
                            backgroundColor: '#4B8BF5',
                            borderColor: '#4B8BF5'
                        }}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title={`Are you sure you want to delete this ${sectionConfigs[activeSection]?.entityName?.toLowerCase()}?`}
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="primary"
                            danger
                            icon={<DeleteOutlined />}
                            size="small"
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // Render catalogue section
    const renderCatalogueSection = () => {
        const config = sectionConfigs[activeSection];
        if (!config) return null;

        return (
            <div>
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title level={2} style={{ color: '#1a365d' }}>{config.entityName} Management</Title>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => openModal()}
                        size="large"
                        style={{ 
                            backgroundColor: '#4B8BF5',
                            borderColor: '#4B8BF5'
                        }}
                    >
                        Add New {config.entityName}
                    </Button>
                </div>

                <Card style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <Table
                        columns={columns}
                        dataSource={config.data}
                        rowKey="id"
                        loading={loading}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} of ${total} items`,
                        }}
                        locale={{
                            emptyText: (
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description={`No ${config.entityName.toLowerCase()}s found`}
                                />
                            ),
                        }}
                        style={{
                            '& .ant-table-thead > tr > th': {
                                backgroundColor: '#f8f9fa',
                                color: '#1a365d',
                                fontWeight: '600'
                            }
                        }}
                    />
                </Card>
            </div>
        );
    };

    // Render other sections (placeholder)
    const renderOtherSection = (sectionId: string) => {
        const menuItem = menuItems.find(item => item.key === sectionId);
        return (
            <div>
                <Title level={2} style={{ color: '#1a365d' }}>{menuItem?.label} Management</Title>
                <Card style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <div style={{ fontSize: '48px', color: '#4B8BF5', marginBottom: '16px' }}>
                            {menuItem?.icon && React.cloneElement(menuItem.icon, { style: { fontSize: '48px' } })}
                        </div>
                        <Title level={3} type="secondary">
                            {menuItem?.label} Coming Soon
                        </Title>
                        <Text type="secondary">
                            This section will be implemented following the same pattern as other catalogue sections.
                        </Text>
                    </div>
                </Card>
            </div>
        );
    };

    // Get current section title for modal
    const getCurrentSectionTitle = () => {
        const config = sectionConfigs[activeSection];
        return config?.entityName || 'Item';
    };

    const renderContent = () => {
        const config = sectionConfigs[activeSection];
        if (config) {
            return renderCatalogueSection();
        } else {
            return renderOtherSection(activeSection);
        }
    };

    return (
        <>
            <AppHeader />
            <Layout style={{ minHeight: '100vh', marginTop: '64px' }}>
                <Sider 
                    width={250} 
                    style={{ 
                        background: '#4472C4',
                        borderRight: '1px solid #e1e8ed'
                    }}
                >
                    <div style={{ 
                        padding: '16px', 
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        backgroundColor: '#4472C4'
                    }}>
                        <Space>
                            <SettingOutlined style={{ fontSize: '24px', color: '#ffffff' }} />
                            <Title level={3} style={{ margin: 0, color: '#ffffff' }}>Settings</Title>
                        </Space>
                    </div>
                    <Menu
                        mode="inline"
                        selectedKeys={[activeSection]}
                        items={menuItems}
                        onClick={({ key }) => setActiveSection(key as SectionKey)}
                        style={{ 
                            border: 'none', 
                            marginTop: '8px',
                            backgroundColor: '#4472C4'
                        }}
                        theme="dark"
                    />
                </Sider>

                <Layout>
                    <Content style={{ padding: '24px', background: '#f8f9fa' }}>
                        <Spin spinning={loading && !Object.keys(sectionConfigs).includes(activeSection)}>
                            {renderContent()}
                        </Spin>

                        <Modal
                            title={`${editingRecord ? 'Edit' : 'Add New'} ${getCurrentSectionTitle()}`}
                            open={isModalVisible}
                            onCancel={closeModal}
                            footer={null}
                            style={{ borderRadius: '8px' }}
                        >
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleSubmit}
                            >
                                <Form.Item
                                    label={`${getCurrentSectionTitle()} Name`}
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: `Please enter ${getCurrentSectionTitle().toLowerCase()} name!`,
                                        },
                                        {
                                            min: 2,
                                            message: 'Name must be at least 2 characters long!',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder={`Enter ${getCurrentSectionTitle().toLowerCase()} name`}
                                        size="large"
                                        style={{ borderRadius: '6px' }}
                                    />
                                </Form.Item>

                                <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                                    <Space>
                                        <Button 
                                            onClick={closeModal}
                                            style={{ borderRadius: '6px' }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={loading}
                                            icon={<SaveOutlined />}
                                            style={{ 
                                                backgroundColor: '#4B8BF5',
                                                borderColor: '#4B8BF5',
                                                borderRadius: '6px'
                                            }}
                                        >
                                            {editingRecord ? 'Update' : 'Create'}
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default SettingsPage;