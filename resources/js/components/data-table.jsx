// components/data-table.tsx

import { getQueryParam } from '@/lib/utils';
import { ChevronDown, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Input } from './ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from './ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

function TableToolbar({ searchable, search, setSearch, handleSearch, filterable, filter, setFilter, filterOptions = [], handleFilter, filterLabel }) {
    const selectedFilter = filterOptions.find((option) => option.value === filter);

    return (
        <div className="flex w-full flex-col justify-start space-y-4 py-4 md:flex-row md:justify-between md:space-y-0">
            {searchable && (
                <div className="flex w-full items-center gap-2 md:w-2/3">
                    <Input
                        id="search"
                        placeholder="Search..."
                        value={search}
                        type="text"
                        className="w-full"
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch(search)}
                    />
                    <Button onClick={() => handleSearch(search)}>Search</Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setSearch('');
                            handleSearch('');
                        }}
                    >
                        Reset
                    </Button>
                </div>
            )}
            {filterable && (
                <div className="flex items-center gap-2">
                    <span>Filter</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <span>{selectedFilter?.label ?? 'Select'}</span>
                                <ChevronDown className="ml-auto" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {filterOptions.map((option) => (
                                <DropdownMenuCheckboxItem
                                    key={option.value}
                                    checked={filter === option.value}
                                    onCheckedChange={(checked) => {
                                        const value = checked ? option.value : '';
                                        setFilter(value);
                                        handleFilter(value);
                                    }}
                                >
                                    {option.label}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </div>
    );
}

function TablePagination({ pagination }) {
    if (!pagination) return null;

    const { links, current_page, last_page, first_page_url, last_page_url } = pagination;

    return (
        <Pagination className="justify-end">
            <PaginationContent>
                <PaginationItem>
                    <PaginationLink href={first_page_url} isActive={current_page === 1}>
                        <ChevronsLeft />
                    </PaginationLink>
                </PaginationItem>

                {links?.map((link, index) => {
                    const label = link.label;
                    const isFirst = index === 0;
                    const isLast = index === links.length - 1;
                    const pageNum = parseInt(label);
                    const isLong = links.length > 5;

                    if (isLong) {
                        if (isFirst)
                            return (
                                <PaginationItem key={index}>
                                    <PaginationPrevious href={link.url} disabled={!link.url} />
                                </PaginationItem>
                            );

                        if (isLast)
                            return (
                                <PaginationItem key={index}>
                                    <PaginationNext href={link.url} disabled={!link.url} />
                                </PaginationItem>
                            );

                        if (isNaN(pageNum)) return null;

                        const showNumber = Math.abs(current_page - pageNum) <= 1 || pageNum === 1 || pageNum === last_page;
                        const showEllipsis = Math.abs(current_page - pageNum) === 2;

                        if (showEllipsis) return <PaginationEllipsis key={index} />;
                        if (!showNumber) return null;

                        return (
                            <PaginationItem key={index}>
                                <PaginationLink href={link.url} isActive={link.active}>
                                    {label}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    }

                    // fallback (short pagination)
                    return (
                        <PaginationItem key={index}>
                            {label === 'pagination.previous' ? (
                                <PaginationPrevious href={link.url} disabled={!link.url} />
                            ) : label === 'pagination.next' ? (
                                <PaginationNext href={link.url} disabled={!link.url} />
                            ) : (
                                <PaginationLink href={link.url} isActive={link.active}>
                                    {label}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    );
                })}

                <PaginationItem>
                    <PaginationLink href={last_page_url} isActive={current_page === last_page}>
                        <ChevronsRight />
                    </PaginationLink>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export function DataTable({
    dataSource,
    selectedRows,
    columns,
    pagination,
    searchable = false,
    handleSearch,
    filterable = false,
    filterOptions,
    filterLabel,
    handleFilter,
}) {
    const [search, setSearch] = useState(getQueryParam('search'));
    const [filter, setFilter] = useState(getQueryParam('filter'));

    return (
        <div>
            {(searchable || filterable) && (
                <TableToolbar
                    searchable={searchable}
                    search={search}
                    setSearch={setSearch}
                    handleSearch={handleSearch}
                    filterable={filterable}
                    filter={filter}
                    setFilter={setFilter}
                    filterOptions={filterOptions}
                    filterLabel={filterLabel}
                    handleFilter={handleFilter}
                />
            )}

            <div className="w-full overflow-x-auto rounded-md border">
                <Table>
                    <TableHeader className="bg-muted dark:bg-muted-foreground sticky top-0 z-[1]">
                        <TableRow>
                            {columns.map((col, idx) => (
                                <TableHead key={`head-${idx}`} colSpan={col.items?.length > 0 ? col.items.length : 1} rowSpan={col.items ? 1 : 2}>
                                    {col.title}
                                </TableHead>
                            ))}
                        </TableRow>
                        {columns.some((col) => col.items) && (
                            <TableRow>
                                {columns.map((col, idx) =>
                                    col.items
                                        ? col.items.map((sub, subIdx) => <TableHead key={`sub-${idx}-${subIdx}`}>{sub.title}</TableHead>)
                                        : null,
                                )}
                            </TableRow>
                        )}
                    </TableHeader>
                    
                    <TableBody>
                        {dataSource?.length > 0 ? (
                            dataSource.map((data, rowIdx) => (
                                <TableRow key={`row-${rowIdx}`}>
                                    {columns.map((col, colIdx) => {
                                        if (col.items) {
                                            return col.items.map((subCol, subIdx) => {
                                                const value = data[subCol.dataIndex];
                                                return (
                                                    <TableCell key={`cell-${rowIdx}-${colIdx}-${subIdx}`}>
                                                        {subCol.render
                                                            ? subCol.render(value, rowIdx, data)
                                                            : typeof value === 'object'
                                                              ? JSON.stringify(value)
                                                              : value}
                                                    </TableCell>
                                                );
                                            });
                                        } else {
                                            const value = data[col.dataIndex];
                                            return (
                                                <TableCell key={`cell-${rowIdx}-${colIdx}`}>
                                                    {col.render
                                                        ? col.render(value, rowIdx, data)
                                                        : typeof value === 'object'
                                                          ? JSON.stringify(value)
                                                          : value}
                                                </TableCell>
                                            );
                                        }
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between py-4">
                <div className="text-muted-foreground text-sm">
                    {selectedRows ?? 0} of {dataSource?.length} row(s) selected.
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm">
                        Page {pagination?.current_page ?? 0} of {pagination?.last_page ?? 0}
                    </span>
                    <TablePagination pagination={pagination} />
                </div>
            </div>
        </div>
    );
}
