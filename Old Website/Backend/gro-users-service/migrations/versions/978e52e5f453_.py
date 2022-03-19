"""empty message

Revision ID: 978e52e5f453
Revises: fcc97c23be52
Create Date: 2020-03-26 11:00:41.434083

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '978e52e5f453'
down_revision = 'fcc97c23be52'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('financial', sa.Column('created_date', sa.String(), nullable=True))
    op.add_column('financial', sa.Column('created_time', sa.String(), nullable=True))
    op.add_column('financial', sa.Column('json_data', sa.String(), nullable=True))
    op.drop_column('financial', 'auditindicator')
    op.drop_column('financial', 'financial_statement_todate')
    op.drop_column('financial', 'currency_iso_alpha3_code')
    op.drop_column('financial', 'fiscalindicator')
    op.drop_column('financial', 'financial_statement_fromdate')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('financial', sa.Column('financial_statement_fromdate', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
    op.add_column('financial', sa.Column('fiscalindicator', sa.BOOLEAN(), autoincrement=False, nullable=False))
    op.add_column('financial', sa.Column('currency_iso_alpha3_code', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('financial', sa.Column('financial_statement_todate', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
    op.add_column('financial', sa.Column('auditindicator', sa.BOOLEAN(), autoincrement=False, nullable=False))
    op.drop_column('financial', 'json_data')
    op.drop_column('financial', 'created_time')
    op.drop_column('financial', 'created_date')
    # ### end Alembic commands ###