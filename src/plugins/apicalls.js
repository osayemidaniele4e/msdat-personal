import apiEndpoints from '@/modules/data-layer/config/endpoint';
import testInstance from './test-axios';

const getDashboard = await testInstance.get(apiEndpoints.getDashboard);

export default { getDashboard };
