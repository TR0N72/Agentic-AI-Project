# Import modules
from services.llm_service import LLMService
from services.embedding_service import EmbeddingService
from services.vector_service import VectorService
from vector_db.elasticsearch_service import ElasticBM25Service
from vector_db.qdrant_service import QdrantVectorService
from vector_db.hybrid_retriever import HybridRetriever
from services.agent_service import AgentService
from services.tool_registry import ToolRegistry
from clients.api_clients import UserServiceClient, QuestionServiceClient, APIGatewayClient
from clients.grpc_clients import UserServiceGRPCClient, QuestionServiceGRPCClient, APIGatewayGRPCClient
from orchestrator_service import orchestrator_service

# Initialize services
llm_service = LLMService()
embedding_service = EmbeddingService()
vector_service = VectorService()
bm25_service = ElasticBM25Service()
qdrant_service = QdrantVectorService()
agent_service = AgentService()
tool_registry = ToolRegistry()
user_client = UserServiceClient()
question_client = QuestionServiceClient()
api_gateway_client = APIGatewayClient()

# Initialize gRPC clients
user_grpc_client = UserServiceGRPCClient()
question_grpc_client = QuestionServiceGRPCClient()
api_gateway_grpc_client = APIGatewayGRPCClient()

# Set up service dependencies
vector_service.set_embedding_service(embedding_service)
qdrant_service.set_embedding_service(embedding_service)
agent_service.set_tool_registry(tool_registry)
